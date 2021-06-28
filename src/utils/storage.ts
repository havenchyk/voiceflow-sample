import * as localStorage from './localStorage';

const removeAllUsers = () => {
  try {
    const users: string[] = JSON.parse(`${localStorage.getItem('users')}`);

    users.forEach((user) => localStorage.removeItem(user));

    localStorage.removeItem('users');
  } catch (e) {
    console.error(e.message);
  }
};

const getUsers = (): string[] | null => {
  let users: string[] | null = null;

  try {
    users = JSON.parse(`${localStorage.getItem('users')}`);
  } catch (e) {
    console.error(e.message);
  }

  return users;
};

const setUsers = (users: string[]) => {
  try {
    localStorage.setItem('users', JSON.stringify(users));
  } catch (e) {
    console.error(e.message);
  }
};

const removeUser = (user: string) => {
  try {
    const users = getUsers();

    if (users) {
      const filteredUsers = users.filter((name) => name !== user);

      setUsers(filteredUsers);
    }

    localStorage.removeItem(user);
  } catch (e) {
    console.error(e.message);
  }
};

const getMessages = (user: string) => {
  let messages = null;

  try {
    messages = JSON.parse(`${localStorage.getItem(user)}`);
  } catch (e) {
    console.error(e.message);
  }

  return messages;
};

export { getMessages, getUsers, removeAllUsers, removeUser, setUsers };
