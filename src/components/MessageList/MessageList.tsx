import React, { FC, useEffect, useRef } from 'react';

import * as types from '../../types';
import styles from './styles.module.css';

interface Props {
  messages: types.Message[];
}

const MessageList: FC<Props> = ({ messages }) => {
  // refactor to a separate hook
  const lastRow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToLastElement();
  }, [messages]);

  const scrollToLastElement = () => {
    if (!lastRow.current) return;

    lastRow.current.scrollIntoView();
  };

  return (
    <div className={styles.root}>
      {messages.length === 0 && <div>This is beginning of your history, the request is sent, please wait a bit</div>}
      {messages.map((message, index) => {
        // last item is special
        if (index === messages.length - 1) return null;

        return (
          <div className={`${styles.message} ${message.type === 'req' ? '' : styles.messageRight}`} key={index}>
            <span>{message.text}</span>
          </div>
        );
      })}

      {messages.length > 0 && (
        <div ref={lastRow} className={`${styles.message} ${messages[messages.length - 1].type === 'res' ? styles.messageRight : ''}`}>
          <span>{messages[messages.length - 1].text}</span>
        </div>
      )}
    </div>
  );
};

export default MessageList;
