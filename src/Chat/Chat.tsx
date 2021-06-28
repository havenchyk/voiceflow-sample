import './styles.css';

import { GeneralTrace } from '@voiceflow/general-types';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { http, storage } from '../utils';

type UserParams = {
  userID: string;
};
interface Message {
  type: 'req' | 'res';
  text: string;
}

const traceToMessages = (trace: GeneralTrace[]): Message[] => {
  return trace.filter(({ type }) => type === 'speak').map(({ payload }) => ({ text: payload.message, type: 'res' }));
};

const Chat: React.FC = () => {
  const history = useHistory();
  const { userID } = useParams<UserParams>();
  const [userName, setUserName] = useState<string>();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const lastRow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToLastElement();
    saveMessagesToStorage();
  }, [messages]);

  useEffect(() => {
    validateUser();
    initialDataLoading();
  }, []);

  const scrollToLastElement = () => {
    if (!lastRow.current) return;

    lastRow.current.scrollIntoView();
  };

  const saveMessagesToStorage = () => {
    if (messages && messages.length > 0) {
      storage.setMessages(userID, messages);
    }
  };

  const validateUser = () => {
    const users = storage.getUsers();

    if (!users) return;

    const user = users.find((user) => user.toLowerCase() === userID);

    if (!user) {
      history.replace('/dashboard');
    }

    // only to simulate real time requests
    setTimeout(() => {
      setUserName(user);
    }, 1000);
  };

  const initialDataLoading = () => {
    const messages = storage.getMessages(userID);

    if (messages && messages.length > 0) {
      setMessages(messages);
    } else {
      http
        .launch(userID)
        .then((traceFromLaunch) => {
          const messages = traceToMessages(traceFromLaunch);

          return setMessages(messages);
        })
        .catch(console.error);
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setMessage(e.target.value);
  };

  const clearInput = () => {
    setMessage('');
  };

  const sendMessage = async () => {
    try {
      const trace = await http.interact(message, userID);
      const respMessages = traceToMessages(trace);

      setMessages((oldMessages) => oldMessages.concat(respMessages));
    } catch (e) {
      console.error(e.message);
    }
  };

  const handleSendMessage = async () => {
    clearInput();

    setMessages((oldMessages) => {
      const newMessage: Message = {
        text: message,
        type: 'req',
      };

      return [...oldMessages, newMessage];
    });

    return sendMessage();
  };

  return (
    <div className="chat">
      {/* likely move it to the header */}
      {!userName && <h4>Loading...</h4>}
      {userName && <h4>This is a conversation for "{userName}"</h4>}

      <div className="chat--messages">
        {messages.map((message, index) => {
          // last item is special
          if (index === messages.length - 1) return null;

          return (
            <div className={`chat--message ${index % 2 === 0 ? '' : 'chat--message-right'}`} key={index}>
              <span>{message.text}</span>
            </div>
          );
        })}
        {messages.length > 0 && (
          <div ref={lastRow} className={`chat--message ${messages.length % 2 === 0 ? 'chat--message-right' : ''}`}>
            <span>{messages[messages.length - 1].text}</span>
          </div>
        )}
      </div>

      <div className="chat--actions">
        <textarea value={message} onChange={handleChange} className="chat--input" placeholder="user input here" rows={4} autoComplete="none" />
        <button disabled={!message} onClick={handleSendMessage} className="button chat--input-button">
          Send
        </button>
        {/*
        <button
          className="button"
          onClick={() => {
            http.fetchState(userID);
          }}
        >
          fetch state
        </button>
        <button
          className="button"
          onClick={() => {
            http.launch(userID);
          }}
        >
          launch
        </button>
        <button
          className="button"
          onClick={() => {
            http.deleteState(userID);
          }}
        >
          delete state
        </button> */}
      </div>
    </div>
  );
};

export default Chat;
