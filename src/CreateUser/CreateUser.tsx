import './styles.css';

import React, { useState } from 'react';

import { localStorage } from '../utils';

interface Props {
  onSubmit: (username: string) => void;
}

const CreateUser = ({ onSubmit }: Props) => {
  const [name, setName] = useState('');

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
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
      <div>
        <label>
          Username: <input value={name} onChange={handleChange} />
        </label>
      </div>
      <button disabled={!name}>Add</button>
    </form>
  );
};

export default CreateUser;
