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
        <div className="Modal-Content">
          <div className="Modal-Header">
            <button
              onClick={goBack}
              className="waves-effect"
              style={{
                float: 'right',
                backgroundColor: 'transparent',
                border: 'none',
                width: '30px',
                height: '30px',
                lineHeight: '30px',
                borderRadius: '50%',
                padding: 0,
              }}
            >
              <i
                className="material-icons"
                style={{
                  lineHeight: '30px',
                  verticalAlign: 'middle',
                }}
              >
                close
              </i>
            </button>
            <h4>
              {contact.id ? 'Редактирование контакта' : 'Создание контакта'}
            </h4>
          </div>
          <div className="input-field">
            <i className="material-icons prefix">person</i>
            <input
              onChange={update}
              type="text"
              name="name"
              value={contact.name}
              id="contact-name"
            />
            <label
              className={contact.id ? 'active' : ''}
              htmlFor="contact-name"
            >
              Имя
            </label>
          </div>
          <div className="input-field">
            <i className="material-icons prefix">contact_phone</i>
            <input
              onChange={update}
              type="text"
              name="phone"
              value={contact.phone}
              id="contact-phone"
            />
            <label
              className={contact.id ? 'active' : ''}
              htmlFor="contact-phone"
            >
              Телефон
            </label>
          </div>
          <div className="input-field">
            <i className="material-icons prefix">contact_mail</i>
            <input
              onChange={update}
              type="text"
              name="email"
              value={contact.email}
              id="contact-email"
            />
            <label
              className={contact.id ? 'active' : ''}
              htmlFor="contact-email"
            >
              Почта
            </label>
          </div>
          <div className="Modal-Footer text-right">
            <button
              disabled={!contact.id}
              onClick={onDelete}
              className="btn-flat red-text text-darken-4"
            >
              Удалить
              <i className="material-icons right">delete_forever</i>
            </button>
            <span> </span>
            <button
              disabled={!contact.name || !contact.phone || !contact.email}
              className="btn waves-effect waves-light blue darken-4"
              onClick={save}
            >
              Сохранить
              <i className="material-icons right">save</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Modal = connect(null, {
  addContact,
  deleteContact,
})(_Modal);
