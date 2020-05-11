import React, { useState } from 'react';
import { useSelector, connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { StoreState } from '../reducers';
import { Contact, addContact, deleteContact } from '../actions';

interface ModalProps {
  addContact: Function;
  deleteContact: Function;
}

const _Modal: React.FC<ModalProps> = ({ addContact, deleteContact }) => {
  const history = useHistory();
  const { id } = useParams();
  const search = useSelector((state: StoreState) => {
    const searchRes = state.contacts.data.find((contact) => {
      return contact.id === id;
    });
    return searchRes || { name: '', email: '', phone: '' };
  });

  const [contact, setContact] = useState<Contact>(search);

  const goBack = (): void => history.goBack();
  const stop = (e: React.MouseEvent): void => e.stopPropagation();

  const update = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const contactProp = { [e.target.name]: e.target.value };
    setContact((prevState: Contact) => {
      return {
        ...prevState,
        ...contactProp,
      };
    });
  };

  const save = (): void => {
    addContact(contact);
    goBack();
  };

  const onDelete = (): void => {
    if (contact.id) {
      deleteContact(contact.id);
      goBack();
    }
  };

  return (
    <div onClick={goBack} className="Modal">
      <div onClick={stop} className="Modal-Body">
        <div className="input">
          <label htmlFor="">
            Имя:
            <input
              onChange={update}
              type="text"
              name="name"
              value={contact.name}
            />
          </label>
        </div>
        <div className="input">
          <label htmlFor="">
            Телефон:
            <input
              onChange={update}
              type="text"
              name="phone"
              value={contact.phone}
            />
          </label>
        </div>
        <div className="input">
          <label htmlFor="">
            Почта:
            <input
              onChange={update}
              type="text"
              name="email"
              value={contact.email}
            />
          </label>
        </div>
        <button onClick={save}>Сохранить</button>
        <button onClick={onDelete}>Удалить</button>
      </div>
    </div>
  );
};

export const Modal = connect(null, {
  addContact,
  deleteContact,
})(_Modal);
