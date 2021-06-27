import './styles.css';

import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { localStorage } from '../utils';

type UserParams = {
  userID: string;
};

// here we can request some data from backend and handle the error

const Chat: React.FC = () => {
  const { userID } = useParams<UserParams>();
  const [userName, setUserName] = useState<string>();
  const history = useHistory();
  const [message, setMessage] = useState('');

  useEffect(() => {
    // get username from localStorage
    const users: string[] = JSON.parse(`${localStorage.getItem('users')}`);

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

  const handleSendMessage = () => {
    // send message
    alert('message is sent!');

    // clear input
    setMessage('');
  };

  return (
    <div className="chat">
      {/* likely move it to the header - it's much better */}
      {!userName && <div>Loading...</div>}
      {userName && <h4 className="chat--subtitle">This is a conversation for "{userName}"</h4>}

      <div className="chat--messages">
        <dl>
          <dt>Can I order some pizza</dt>
          <dd>Sure what kind of pizza do you want?</dd>

          <dt>Pepperoni and Cheese</dt>
          <dd>Great, pepperoni and cheese coming up!</dd>
        </dl>
      </div>

      <div className="chat--actions">
        <textarea value={message} onChange={handleChange} className="chat--input" placeholder="user input here" rows={4} autoComplete="none" />
        <button disabled={!message} onClick={handleSendMessage} className="button chat--input-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
