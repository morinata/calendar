import {getUsers} from '../../../api/api';
import {AppDispatch} from '../../index';
import {IUser} from '../../../models/IUser';
import {AuthActionEnum, SetAuthAction, SetErrorAction, SetLoadingAction, SetUserAction} from './types';

export const AuthActionCreators = {
  setIsAuth: (isAuth: boolean): SetAuthAction => ({type: AuthActionEnum.SET_AUTH, payload: isAuth}),
  setUser: (user: IUser): SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user}),
  setLoading: (isLoading: boolean): SetLoadingAction => ({type: AuthActionEnum.SET_LOADING, payload: isLoading}),
  setError: (error: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload: error}),
  login: (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.setLoading(true));
      setTimeout(async () => {
        const response = await getUsers();
        const mockUser = response.data.find((user) => user.username === username && user.password === password);
        if (mockUser) {
          localStorage.setItem('auth', 'true');
          localStorage.setItem('username', mockUser.username);
          dispatch(AuthActionCreators.setUser(mockUser));
          dispatch(AuthActionCreators.setIsAuth(true));
        } else {
          dispatch(AuthActionCreators.setError('Incorrect Username or Password'));
        }
        dispatch(AuthActionCreators.setLoading(false));
      }, 1000);
    } catch (e) {
      dispatch(AuthActionCreators.setError('Something went wrong'));
    }
  },
  logout: () => async (dispatch: AppDispatch) => {
    localStorage.removeItem('auth');
    localStorage.removeItem('username');
    dispatch(AuthActionCreators.setIsAuth(false));
    dispatch(AuthActionCreators.setUser({} as IUser));
  },
};