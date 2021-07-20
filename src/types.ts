export interface Message {
  id: string;
  type: 'req' | 'res';
  text: string;
  // for audio
  src?: string;
}

export interface User {
  // unique identifier of the user for a quick search
  id: string;
  // some data of the user
  name: string;
  // array of ids
  messages: string[];
}
