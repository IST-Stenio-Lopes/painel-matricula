import axios from 'axios';
import { Service } from 'axios-middleware';

export const service = new Service(axios);

export interface ResponseData<T> {
  object_list: T[];
  max_pages: number;
  max_itens: number;
}

// baseURL: 'http://192.168.191.188:4444', 'http://192.168.1.191:4444',

const api = axios.create({
  baseURL: 'http://192.168.1.191:4444',
});

export default api;
