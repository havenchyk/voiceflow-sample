import './styles.css';

import React, { ChangeEventHandler, FC, FormEventHandler, useContext, useEffect, useRef, useState } from 'react';

import * as actions from '../actions';
import { DataContext } from '../Data';

interface Props {
  onSubmit: () => void;
}

const CreateUser: FC<Props> = ({ onSubmit }) => {
  const { dispatch } = useContext(DataContext);
  const [name, setName] = useState('');
  const inputNode = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputNode.current?.focus();
  }, []);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  };

  const handleClose: FormEventHandler<HTMLButtonElement> = () => {
    // do nothing but hide the form
    onSubmit();
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    dispatch(actions.addUser(name));

    onSubmit();
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
