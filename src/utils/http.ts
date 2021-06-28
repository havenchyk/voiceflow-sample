import { GeneralTrace, RequestType, TextRequest } from '@voiceflow/general-types';
import axios, { AxiosRequestConfig } from 'axios';

const versionID = process.env.REACT_APP_VERSION_ID;
const userID = process.env.REACT_APP_USER_ID;
const APIKey = process.env.REACT_APP_API_KEY;

// eslint-disable-next-line import/prefer-default-export
export const interact = async (message: string): Promise<GeneralTrace[]> => {
  const request: TextRequest = { type: RequestType.TEXT, payload: message };

  const { data } = await axios.post(
    `https://general-runtime.voiceflow.com/state/${versionID}/user/${userID}/interact`,
    { request, config: { tts: true } },
    { headers: { Authorization: APIKey } }
  );

  return data;
};

const requestOptions: AxiosRequestConfig = {
  method: 'post',
  url: `https://general-runtime.voiceflow.com/state/${versionID}/user/steve/interact`,
  headers: {
    Authorization: `${APIKey}`,
  },
  data: {
    request: {
      type: 'text',
      payload: 'hello',
    },
  },
};
