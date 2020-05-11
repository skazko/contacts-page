import { Contact, Action, ActionTypes } from '../actions';

export interface ContactsState {
  data: Contact[];
  pending: boolean;
  error: boolean;
}

export const contactsReducer = (
  state: ContactsState = { data: [], pending: false, error: false },
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.addContact:
      return {
        ...state,
        pending: false,
        data: [...state.data, action.payload],
      };
    case ActionTypes.fetchContactsPending:
      return {
        ...state,
        pending: true,
      };
    case ActionTypes.fetchContactsSucces:
      return {
        pending: false,
        error: false,
        data: action.payload,
      };
    case ActionTypes.fetchContactsError:
      return {
        ...state,
        pending: false,
        error: true,
      };
    case ActionTypes.deleteContact:
      return {
        ...state,
        pending: false,
        data: state.data.filter(
          (contact: Contact) => contact.id !== action.payload
        ),
      };
    case ActionTypes.updateContact:
      const i = state.data.findIndex(
        (contact: Contact) => contact.id === action.payload.id
      );
      return {
        ...state,
        pending: false,
        data: [
          ...state.data.slice(0, i),
          action.payload,
          ...state.data.slice(i + 1),
        ],
      };
    default:
      return state;
  }
};
