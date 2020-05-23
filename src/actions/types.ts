import {
  DeleteContactAction,
  FetchContactsSuccesAction,
  FetchContactsErrorAction,
  FetchContactsPendingAction,
  AddContactAction,
  UpdateContactAction,
} from './contacts';

import { AuthAction, WrongAuthAction, LogoutAction } from './auth';

export enum ActionTypes {
  fetchContactsSucces,
  fetchContactsPending,
  fetchContactsError,
  addContact,
  deleteContact,
  updateContact,
  authenticate,
  wrongAuth,
  logout,
}

export type Action =
  | FetchContactsSuccesAction
  | DeleteContactAction
  | FetchContactsErrorAction
  | FetchContactsPendingAction
  | AddContactAction
  | UpdateContactAction
  | AuthAction
  | WrongAuthAction
  | LogoutAction;
