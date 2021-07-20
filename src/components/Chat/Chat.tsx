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

const traceToMessages = (trace: GeneralTrace[]): types.Message[] => {
  return trace.filter(({ type }) => type === 'speak').map(({ payload }) => ({ text: payload.message, type: 'res', src: payload.src, id: 'temp-id' }));
};

const Chat: FC = () => {
  const history = useHistory();
  const { userID } = useParams<UserParams>();
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string>();
  const [messages, setMessages] = useState<types.Message[]>([]);

  // call functions on some action
  const { play, pause, updateSource } = useAudio();
  const { state, dispatch } = useContext(DataContext);

  useEffect(() => {
    validateUser();
  }, []);

  useEffect(() => {
    const user = state.users.byID[userID];

    if (!user) return;

    const userMessages = user.messages.map((messageID) => state.messages[messageID]);

    setMessages(userMessages);

    if (loading) {
      setLoading(false);
    }
  }, [state.users]);

  useEffect(() => {
    if (loading) return;

    if (messages.length === 0 || messages[messages.length - 1].type !== 'res') {
      fetchInitialData();
    }
  }, [loading]);

  useEffect(() => {
    if (loading) return;

    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];

      updateSoundSourceAndPlay(lastMessage.src);
    }
  }, [messages.length, loading]);

  function updateSoundSourceAndPlay(src?: string) {
    if (src) {
      updateSource(src);
      play();
    } else {
      pause();
    }
  }

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

  const fetchInitialData = () => {
    api
      .launch(userID)
      .then((traceFromLaunch) => {
        const messages = traceToMessages(traceFromLaunch);

        const newMessage = messages[messages.length - 1];

        return dispatch(actions.newMessage(userID, 'res', newMessage.text, newMessage.src));
      })
      .catch(console.error);
  };

  const handleNewMessage = (text: string) => {
    dispatch(actions.newMessage(userID, 'req', text));

    sendMessage(text);
  };

  const sendMessage = async (text: string) => {
    try {
      // can be in thunk
      const trace = await api.interact(text, userID);
      const respMessages = traceToMessages(trace);

      const newMessage = respMessages[respMessages.length - 1];

      dispatch(actions.newMessage(userID, 'res', newMessage.text, newMessage.src));
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <div className={styles.root}>
      {!userName && <h4>Loading...</h4>}
      {userName && <h4>Conversation for "{userName}"</h4>}

      <MessageList messages={messages} />
      <NewMessage onSubmit={handleNewMessage} />
    </div>
  );
};

export default Chat;
