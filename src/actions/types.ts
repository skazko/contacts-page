import {
  DeleteContactAction,
  FetchContactsSuccesAction,
  FetchContactsErrorAction,
  FetchContactsPendingAction,
  AddContactAction,
  UpdateContactAction,
} from './contacts';

export enum ActionTypes {
  fetchContactsSucces,
  fetchContactsPending,
  fetchContactsError,
  addContact,
  deleteContact,
  updateContact,
}

export type Action =
  | FetchContactsSuccesAction
  | DeleteContactAction
  | FetchContactsErrorAction
  | FetchContactsPendingAction
  | AddContactAction
  | UpdateContactAction;
