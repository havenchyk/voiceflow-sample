import './styles.css';

import React from 'react';
import { useParams } from 'react-router-dom';

type UserParams = {
  userID: string;
};

// here we can request some data from backend and handle the error

const Chat: React.FC = () => {
  const { userID } = useParams<UserParams>();

  return (
    <div className="chat">
      {/* likely move it to the header - it's much better */}
      <h4 className="chat--subtitle">This is a conversation for "{userID}"</h4>

      <div className="chat--messages">
        <dl>
          <dt>Can I order some pizza</dt>
          <dd>Sure what kind of pizza do you want?</dd>

          <dt>Pepperoni and Cheese</dt>
          <dd>Great, pepperoni and cheese coming up!</dd>
        </dl>
      </div>

      <div className="chat--actions">
        <textarea placeholder="user input here" />
        <button>send</button>
      </div>
    </div>
  );
};

export default Chat;
