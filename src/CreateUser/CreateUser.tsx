import './styles.css';

import React, { useEffect, useRef, useState } from 'react';

import { localStorage } from '../utils';

interface Props {
  onSubmit: (username: string) => void;
}

const CreateUser = ({ onSubmit }: Props) => {
  const [name, setName] = useState('');
  const inputNode = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputNode.current?.focus();
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  };

  const handleClose: React.FormEventHandler<HTMLButtonElement> = () => {
    console.log('yes!');
    onSubmit('');
  };

  const saveUser = () => {
    // TODO: consider moving this code to the localstorage service
    const serializedUsers = localStorage.getItem('users');
    let users = [];

    if (serializedUsers) {
      users = JSON.parse(serializedUsers);
    }

    if (users.includes(name)) {
      console.warn(`user ${name} already exists on the list`);
      return;
    }

    users.push(name);

    localStorage.setItem('users', JSON.stringify(users));
  };

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();

    saveUser();

    onSubmit(name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="create-user--row">
        Username: <input ref={inputNode} value={name} onChange={handleChange} />
      </label>

      <div className="create-user--actions">
        <button className="create-user--button" disabled={!name}>
          Add
        </button>

        <button type="button" className="create-user--button button-secondary" onClick={handleClose}>
          Close
        </button>
      </div>
    </form>
  );
};

export default CreateUser;
