import { combineReducers } from 'redux';
import { contactsReducer, ContactsState } from './contacts';

export interface StoreState {
  contacts: ContactsState;
}

export const reducers = combineReducers<StoreState>({
  contacts: contactsReducer,
});
