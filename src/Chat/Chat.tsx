import './styles.css';

import { ChoiceTrace, GeneralTrace, PathTrace, RequestType, TextRequest, VisualTrace } from '@voiceflow/general-types';
import { ImageStepData } from '@voiceflow/general-types/build/nodes/visual';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { http, storage } from '../utils';

type UserParams = {
  userID: string;
};

// trace - list of objects Trace - visual, choice, speak etc
// it has type and payload
// payload can be different

// here we can request some data from backend and handle the error

interface Message {
  type: 'req' | 'res';
  text: string;
}

const Chat: React.FC = () => {
  const { userID } = useParams<UserParams>();
  const [userName, setUserName] = useState<string>();
  const history = useHistory();
  const [message, setMessage] = useState('');
  const lastRow = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([]);

  const [trace, setTrace] = useState<(GeneralTrace | PathTrace)[]>([]);

  useEffect(() => {
    if (!lastRow.current) return;

    lastRow.current.scrollIntoView();
  }, [messages]);

  // storing messages in localstorage
  useEffect(() => {
    if (messages && messages.length) {
      localStorage.setItem(userID, JSON.stringify(messages));
    }
  }, [messages]);

  const renderTrace = (object: GeneralTrace | PathTrace, index: number) => {
    if (object.type === 'speak') {
      return <div>{object.payload.message}</div>;
    }

    if (object.type === 'visual') {
      return (
        <div>
          <img height="90" width="120" src={(object.payload as ImageStepData).image as string} alt="visualization" />
        </div>
      );
    }

    if (object.type === 'choice') {
      // if it's an active step
      if (trace[trace.length - 1] !== object) return false;

      const buttons = object.payload.buttons.map((data) => {
        return (
          data.name && (
            <button
              key={data.name}
              onClick={async () => {
                // TODO: remove buttons
                const trace = await http.interact((data.request.payload as any).query, userID);

                setTrace((oldTrace) => oldTrace.concat(trace));
              }}
              className="button button-secondary"
            >
              {data.name}
            </button>
          )
        );
      });
      return <div>{buttons}</div>;
    }

    if (object.type === 'path') {
      const choice = trace[index - 1] as ChoiceTrace;
      const selectedValue = Number(((object.payload as any).path as string).slice(7)); // choice:1 -> 1

      const button = choice.payload.buttons[selectedValue - 1];

      return <div>{button.name}</div>;
    }

    if (object.type === 'end') {
      return <hr className="separator" />;
    }

    console.warn(`rendering of type ${object.type} is broken!`);

    return false;
  };

  const traceToMessages = (trace: GeneralTrace[]): Message[] => {
    return trace.filter(({ type }) => type === 'speak').map(({ payload }) => ({ text: payload.message, type: 'res' }));
  };

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    // get username from localStorage
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
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    // clear input
    setMessage('');

    setMessages((oldMessages) => {
      const newMessage: Message = {
        text: message,
        type: 'req',
      };

      return [...oldMessages, newMessage];
    });

    // send message
    const trace = await http.interact(message, userID);

    const respMessages = traceToMessages(trace);

    setMessages((oldMessages) => oldMessages.concat(respMessages));
    setTrace((oldTrace) => oldTrace.concat(trace));
  };

  return (
    <div className="chat">
      {/* likely move it to the header - it's much better */}
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
