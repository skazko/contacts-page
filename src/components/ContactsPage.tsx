import React from 'react';
import { connect } from 'react-redux';
import { fetchContacts } from '../actions';
import { StoreState } from '../reducers';
import { ContactsState } from '../reducers/contacts';
import { ContactsList } from './ContactsList';

interface ContactsPageProps {
  contacts: ContactsState;
  fetchContacts: Function;
}

class _ContactsPage extends React.Component<ContactsPageProps> {
  componentDidMount() {
    this.props.fetchContacts();
  }

  render() {
    const { pending, error } = this.props.contacts;
    if (pending) {
      return <div>Pending</div>;
    }
    if (error) {
      return <div>Error</div>;
    }
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ContactsList contacts={this.props.contacts.data} />
      </div>
    );
  }
}

const mapStateToProps = ({
  contacts,
}: StoreState): { contacts: ContactsState } => {
  return {
    contacts,
  };
};

export const ContactsPage = connect(mapStateToProps, {
  fetchContacts,
})(_ContactsPage);
