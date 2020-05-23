import { Dispatch } from 'redux';
import { ActionTypes } from './types';

export interface AuthAction {
  type: ActionTypes.authenticate;
}

export interface WrongAuthAction {
  type: ActionTypes.wrongAuth;
}

export interface LogoutAction {
  type: ActionTypes.logout;
}

interface AuthParams {
  cb: Function;
  username: string;
  password: string;
}

export const authenticate = ({ cb, username, password }: AuthParams) => {
  return (dispatch: Dispatch) => {
    setTimeout(() => {
      if (username === 'user' && password === 'user') {
        dispatch({
          type: ActionTypes.authenticate,
        });
        cb();
      } else {
        dispatch({
          type: ActionTypes.wrongAuth,
        });
      }
    }, 200);
  };
};

export const logout = (): LogoutAction => {
  return {
    type: ActionTypes.logout,
  };
};
