import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';

export interface Contact {
  name: string;
  email: string;
  phone: string;
  id?: string;
}

export interface AddContactAction {
  type: ActionTypes.addContact;
  payload: Contact;
}

export interface FetchContactsSuccesAction {
  type: ActionTypes.fetchContactsSucces;
  payload: Contact[];
}

export interface FetchContactsPendingAction {
  type: ActionTypes.fetchContactsPending;
}

export interface FetchContactsErrorAction {
  type: ActionTypes.fetchContactsError;
}

export interface DeleteContactAction {
  type: ActionTypes.deleteContact;
  payload: string;
}

export interface UpdateContactAction {
  type: ActionTypes.updateContact;
  payload: Contact;
}

function fetchContactsPending(): FetchContactsPendingAction {
  return {
    type: ActionTypes.fetchContactsPending,
  };
}

function fetchContactsError(): FetchContactsErrorAction {
  return {
    type: ActionTypes.fetchContactsError,
  };
}

function fetchContactsSucces(contacts: Contact[]): FetchContactsSuccesAction {
  return {
    type: ActionTypes.fetchContactsSucces,
    payload: contacts,
  };
}

const url = 'http://localhost:5000/contacts/';

export const addContact = (contact: Contact) => {
  return (dispatch: Dispatch) => {
    dispatch<FetchContactsPendingAction>(fetchContactsPending());

    if (contact.id) {
      console.log('updating contact info');
      axios
        .put<Contact>(url + contact.id, contact)
        .then((response) => {
          dispatch<UpdateContactAction>({
            type: ActionTypes.updateContact,
            payload: response.data,
          });
        })
        .catch((e) => {
          dispatch<FetchContactsErrorAction>(fetchContactsError());
        });
    } else {
      axios
        .post<Contact>(url, contact)
        .then((response) => {
          dispatch<AddContactAction>({
            type: ActionTypes.addContact,
            payload: response.data,
          });
        })
        .catch((e) => {
          dispatch<FetchContactsErrorAction>(fetchContactsError());
        });
    }
  };
};

export const fetchContacts = () => {
  return (dispatch: Dispatch) => {
    dispatch<FetchContactsPendingAction>(fetchContactsPending());

    axios
      .get<Contact[]>(url)
      .then((response) => {
        dispatch<FetchContactsSuccesAction>(fetchContactsSucces(response.data));
      })
      .catch((e) => {
        dispatch<FetchContactsErrorAction>(fetchContactsError());
      });
  };
};

export const deleteContact = (id: string) => {
  return (dispatch: Dispatch) => {
    dispatch<FetchContactsPendingAction>(fetchContactsPending());
    axios.delete<Contact>(url + id).then((response) => {
      dispatch<DeleteContactAction>({
        type: ActionTypes.deleteContact,
        payload: id,
      });
    });
  };
};
