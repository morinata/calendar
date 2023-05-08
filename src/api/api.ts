import axios, {AxiosResponse} from 'axios';
import {IUser} from '../models/IUser';

export const getUsers = async (): Promise<AxiosResponse<IUser[]>> =>
  await axios.get('./users.json').then((response) => response);
