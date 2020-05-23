import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Contact } from '../actions';

interface ContactsListProps {
  contacts: Contact[];
}

export const ContactsList: React.FC<ContactsListProps> = (props) => {
  const location = useLocation();
  return (
    <div className="card-panel white">
      <Link
        className="btn-floating btn-large waves-effect waves-light orange accent-4 right"
        to={{
          pathname: `/contacts/createNewContact`,
          state: { background: location },
        }}
      >
        <i className="material-icons">person_add</i>
      </Link>
      <h1>Список контактов</h1>
      <ul className="collection">
        {props.contacts.map((contact: Contact) => {
          return (
            <li key={contact.id} className="collection-item avatar">
              <i className="material-icons circle">person</i>
              <span className="title">{contact.name}</span>
              <p>
                {contact.email}
                <br />
                {contact.phone}
              </p>
              <Link
                className="secondary-content"
                to={{
                  pathname: `/contacts/${contact.id}`,
                  state: { background: location },
                }}
              >
                <i className="material-icons">create</i>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
