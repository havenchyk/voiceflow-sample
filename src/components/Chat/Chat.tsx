import { GeneralTrace } from '@voiceflow/general-types';
import React, { FC, useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import * as actions from '../../actions';
import * as types from '../../types';
import { api, storage } from '../../utils';
import { DataContext } from '../Data';
import MessageList from '../MessageList';
import NewMessage from '../NewMessage';
import styles from './styles.module.css';
import useAudio from './useAudio';

type UserParams = {
  userID: string;
};

// const traceToMessages = (trace: GeneralTrace[]): types.Message[] => {
//   return trace.filter(({ type }) => type === 'speak').map(({ payload }) => ({ text: payload.message, type: 'res', src: payload.src }));
// };

const Chat: FC = () => {
  const history = useHistory();
  const { userID } = useParams<UserParams>();
  const [userName, setUserName] = useState<string>();
  const [messages, setMessages] = useState<types.Message[]>([]);

  // call functions on some action
  const { play, pause, updateSource } = useAudio();
  const { state, dispatch } = useContext(DataContext);

  useEffect(() => {
    validateUser();
    // initialDataLoading();
  }, []);

  useEffect(() => {
    const user = state.users.byID[userID];

    if (!user) return;

    const userMessages = user.messages.map((messageID) => state.messages[messageID]);

    setMessages(userMessages);
  }, [state.users]);

  // useEffect(() => {
  //   saveMessagesToStorage();

  //   if (messages && messages.length > 0) {
  //     const { src } = messages[messages.length - 1];

  //     if (src) {
  //       updateSource(src);
  //       // play();
  //     }
  //   }
  // }, [messages]);

  // if (!store) {
  //   return <div>Loading...</div>;
  // }

  const validateUser = () => {
    const user = state.users.byID[userID];

    if (!user) {
      history.replace('/dashboard');
      return;
    }

    // only to simulate real time requests
    setTimeout(() => {
      setUserName(user.name);
    }, 200);
  };

  const initialDataLoading = () => {
    const messages = storage.getMessages(userID);

    if (messages && messages.length > 0) {
      // setMessages(messages);
    } else {
      setTimeout(() => {
        // setMessages([]);

        console.log('messages are loaded');
      }, 500);
      // api
      //   .launch(userID)
      //   .then((traceFromLaunch) => {
      //     const messages = traceToMessages(traceFromLaunch);
      //     return setMessages(messages);
      //   })
      //   .catch(console.error);
    }
  };

  const handleNewMessage = (text: string) => {
    dispatch(actions.newMessage(userID, 'req', text));
  };

  const sendMessage = async () => {
    try {
      // const trace = await api.interact(message, userID);
      // const respMessages = traceToMessages(trace);
      // setMessages((oldMessages) => oldMessages.concat(respMessages));
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <div className={styles.root}>
      {/* likely move it to the header */}
      {!userName && <h4>Loading...</h4>}
      {userName && <h4>This is a conversation for "{userName}"</h4>}

      <MessageList messages={messages} />
      <NewMessage onSubmit={handleNewMessage} />
    </div>
  );
};

export default Chat;
