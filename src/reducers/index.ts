import { combineReducers } from 'redux';
import { contactsReducer, ContactsState } from './contacts';
import { authReducer, AuthState } from './auth';

export interface StoreState {
  contacts: ContactsState;
  fakeAuth: AuthState;
}

export const reducers = combineReducers<StoreState>({
  contacts: contactsReducer,
  fakeAuth: authReducer,
});
