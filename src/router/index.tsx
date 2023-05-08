import {ReactNode} from 'react';
import {Navigate} from 'react-router-dom';
import Login from '../pages/Login';
import Event from '../pages/Event';

export interface IRoute {
  path: string;
  element: ReactNode;
}

export enum RouteNames {
  LOGIN = '/login',
  EVENT = '/',
}

export const publicRoutes  = [
  {path: RouteNames.LOGIN, element: <Login />},
  {path: '*', element: <Navigate to={RouteNames.LOGIN} />},
];

export const privateRoutes: IRoute[] = [
  {path: RouteNames.EVENT, element: <Event />},
  {path: '*', element: <Navigate to={RouteNames.EVENT} />},
];