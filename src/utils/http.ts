import { GeneralTrace, LaunchRequest, RequestType, TextRequest } from '@voiceflow/general-types';
import axios from 'axios';

const versionID = process.env.REACT_APP_VERSION_ID;
const APIKey = process.env.REACT_APP_API_KEY;

// Use a launch request to reset the user and start from the first block in your Voiceflow project.

// eslint-disable-next-line import/prefer-default-export
export const interact = async (message: string, userID: string): Promise<GeneralTrace[]> => {
  const request: TextRequest = { type: RequestType.TEXT, payload: message };

  try {
    const { data } = await axios.post(
      `https://general-runtime.voiceflow.com/state/${versionID}/user/${userID}/interact`,
      { request, config: { tts: true, verbose: true } },
      { headers: { Authorization: APIKey } }
    );

    return data;
  } catch (e) {
    // TODO: probably the is a better way and we don't need to throw an error here
    // but let's keep it for now
    throw new Error('An error occurred during API call');
  }
};

export const launch = async (userID: string): Promise<GeneralTrace[]> => {
  // TODO: payload likely should be omitted from the type
  const request: Omit<LaunchRequest, 'payload'> = { type: RequestType.LAUNCH };

  try {
    const { data } = await axios.post(
      `https://general-runtime.voiceflow.com/state/${versionID}/user/${userID}/interact`,
      { request, config: { tts: true } },
      { headers: { Authorization: APIKey } }
    );

    return data;
  } catch (e) {
    // TODO: probably the is a better way and we don't need to throw an error here
    // but let's keep it for now
    throw new Error('An error occurred during API call');
  }
};

export const fetchState = async (userID: string): Promise<any> => {
  const endpoint = `https://general-runtime.voiceflow.com/state/${versionID}/user/${userID}`;

  const { data } = await axios.get(endpoint, { headers: { Authorization: APIKey } });

  return data;
};

// it can throw an error
export const deleteState = async (userID: string): Promise<any> => {
  const endpoint = `https://general-runtime.voiceflow.com/state/${versionID}/user/${userID}`;

  return axios.delete(endpoint, { headers: { Authorization: APIKey } });
};
