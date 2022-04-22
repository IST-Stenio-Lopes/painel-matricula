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

// const baseURL = 'http://senaisolucoes.com.br:2223';
const baseURL = 'http://192.168.1.191:2223';
// const baseURL = 'http://192.168.191.188:2223';

const api = axios.create({
  baseURL,
});

export default api;
