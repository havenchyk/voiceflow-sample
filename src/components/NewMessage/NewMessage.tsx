import React, { ChangeEventHandler, FC, useState } from 'react';

import styles from './styles.module.css';

interface Props {
  onSubmit: (message: string) => void;
}

const NewMessage: FC<Props> = ({ onSubmit }) => {
  const [message, setMessage] = useState('');

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setMessage(e.target.value);
  };

  const clearInput = () => {
    setMessage('');
  };

  const handleSendMessage = async () => {
    clearInput();

    onSubmit(message);
  };

  return (
    <div className={styles.root}>
      <textarea value={message} onChange={handleChange} className={styles.input} placeholder="user input here" rows={4} autoComplete="none" />
      <button disabled={!message} onClick={handleSendMessage} className="button">
        Send
      </button>
      {/*
        <button
          className="button"
          onClick={() => {
            api.fetchState(userID);
          }}
        >
          fetch state
        </button>
        <button
          className="button"
          onClick={() => {
            api.launch(userID);
          }}
        >
          launch
        </button>
        <button
          className="button"
          onClick={() => {
            api.deleteState(userID);
          }}
        >
          delete state
        </button> */}
    </div>
  );
};

export default NewMessage;
