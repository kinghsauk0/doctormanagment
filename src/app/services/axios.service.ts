import axios, { CancelToken } from 'axios';

export const baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.PRODUCTION_API_URL
    : process.env.LOCAL_API_URL;

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

/**
 * Function that handles axios requests
 * @param {object} params - an object containing the parameters for the axios request
 * @property {('GET'|'POST'|'PATCH'|'DELETE')} params.method - the HTTP method for the request
 * @property {string} params.url - the URL for the request
 * @property {{[key: string]: string}} [params.headers] - (optional) any additional headers to send with the request
 * @property {any} [params.body] - (optional) the data to send with the request
 * @property {{[key: string]: any}} [params.params] - (optional) query parameters to send with the request
 * @property {CancelToken} [params.cancelToken] - (optional) a cancel token to cancel the request if necessary
 * @property {'arraybuffer'|'blob'|'document'|'json'|'text'|'stream'} [params.responseType] - (optional) the type of data that the server will respond with
 * @returns {Promise<{status: number, data: any, message: string}>} - a promise that resolves to an object with the status,
 * data, and message of the axios response
 */

export async function axiosService({
  method,
  url,
  headers,
  body,
  params,
  cancelToken,
  responseType, // Add responseType for handling different data formats
}: {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  url: string;
  headers?: {
    [key: string]: string;
  };
  body?: any;
  params?: {
    [key: string]: any;
  };
  cancelToken?: CancelToken;
  responseType?:
    | 'arraybuffer'
    | 'blob'
    | 'document'
    | 'json'
    | 'text'
    | 'stream'; // Optional responseType
}): Promise<{
  headers: any;
  status: number;
  data: any;
  message: string;
}> {
  try {
    const res = await instance({
      method,
      url,
      headers,
      data: body,
      params,
      cancelToken,
      responseType, // Include responseType in the axios request
    });
    return { ...res.data, headers: res.headers, status: res.status };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      return {
        headers: error.response?.headers ?? null,
        status: error.response?.status ?? 500,
        data: error.response?.data,
        message: error.response?.data?.message || 'Error occurred',
      };
    }
    return {
      headers: null,
      status: 500,
      data: null,
      message: 'Internal server error. Something went wrong',
    };
  }
}
