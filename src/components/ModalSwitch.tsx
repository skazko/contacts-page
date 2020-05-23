import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, useLocation, Redirect } from 'react-router-dom';
import { ContactsPage } from '../pages/ContactsPage';
import { LoginPage } from '../pages/LoginPage';
import { Modal } from './Modal';
import { StoreState } from '../reducers';
import { AuthState } from '../reducers/auth';

interface ModalLocationState {
  background?: any;
}

interface ModalProps {
  fakeAuth: AuthState;
}

const _ModalSwitch: React.FC<ModalProps> = ({ fakeAuth }) => {
  let location = useLocation<ModalLocationState>();
  let background = location.state && location.state.background;
  return (
    <>
      <Switch location={background || location}>
        <Route path="/login" children={<LoginPage />} />
        <Route
          path="/contacts"
          render={({ location }) => {
            return fakeAuth.isAuthenticated ? (
              <ContactsPage />
            ) : (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: location },
                }}
              />
            );
          }}
        />
      </Switch>
      {background && <Route path="/contacts/:id" children={<Modal />} />}
    </>
  );
};

const mapStateToProps = ({ fakeAuth }: StoreState): { fakeAuth: AuthState } => {
  return {
    fakeAuth,
  };
};

export const ModalSwitch = connect(mapStateToProps)(_ModalSwitch);
