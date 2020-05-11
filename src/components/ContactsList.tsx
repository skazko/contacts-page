import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Contact } from '../actions';

interface ContactsListProps {
  contacts: Contact[];
}

export const ContactsList: React.FC<ContactsListProps> = (props) => {
  const location = useLocation();
  return (
    <>
      <Link
        to={{
          pathname: `/contacts/createNewContact`,
          state: { background: location },
        }}
      >
        Добавить контакт
      </Link>
      <ul>
        {props.contacts.map((contact: Contact) => {
          return (
            <li key={contact.id}>
              <Link
                to={{
                  pathname: `/contacts/${contact.id}`,
                  state: { background: location },
                }}
              >
                <p>{contact.name}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};
