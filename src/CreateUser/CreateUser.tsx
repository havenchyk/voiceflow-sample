import './styles.css';

import React, { useEffect, useRef, useState } from 'react';

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
    onSubmit('');
  };

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();

    onSubmit(name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="create-user--row">
        Username: <input ref={inputNode} value={name} onChange={handleChange} />
      </label>

      <div className="create-user--actions">
        <button className="button create-user--button" disabled={!name}>
          Add
        </button>

        <button type="button" className="create-user--button button button-secondary" onClick={handleClose}>
          Close
        </button>
      </div>
    </form>
  );
};

export default CreateUser;
