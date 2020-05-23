import { Action, ActionTypes } from '../actions';

export interface AuthState {
  isAuthenticated: boolean;
  wrongShots: number;
}

export const authReducer = (
  state: AuthState = { isAuthenticated: false, wrongShots: 0 },
  action: Action
): AuthState => {
  switch (action.type) {
    case ActionTypes.authenticate:
      return {
        ...state,
        isAuthenticated: true,
        wrongShots: 0,
      };
    case ActionTypes.wrongAuth:
      return {
        ...state,
        wrongShots: state.wrongShots + 1,
      };
    case ActionTypes.logout:
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
