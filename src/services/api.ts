/* eslint-disable import/no-mutable-exports */
/* eslint-disable implicit-arrow-linebreak */
import axios from 'axios';
import { Service } from 'axios-middleware';

export const service = new Service(axios);

export interface ResponseData<T> {
  object_list: T[];
  max_pages: number;
  max_itens: number;
}

export const initialValue = {
  max_pages: 1,
  max_itens: 1,
  object_list: [],
};

export let expires = false;

const port = '2223';
// export const baseURL = 'http://senaisolucoes.com.br';
export const baseURL = 'http://192.168.1.191';
// export const baseURL = 'http://192.168.191.188';

const api = axios.create({
  baseURL: `${baseURL}:${port}`,
});

axios.interceptors.response.use(
  (response) =>
  // 200 type responses, this should be left as it is
    response,
  (error) => {
    expires = !expires;

    // Handle your 401 error, maybe the UI changes and removing from local storage
    return Promise.reject(error);
  },
);

export default api;
