import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { ModalSwitch } from './ModalSwitch';
import { StoreState } from '../reducers';
import { logout } from '../actions';

interface AppProps {
  isAuthenticated: boolean;
  logout: typeof logout;
}

const _App: React.FC<AppProps> = ({ isAuthenticated, logout }) => {
  const onLogout = (e: React.BaseSyntheticEvent): void => {
    e.preventDefault();
    logout();
  };
  return (
    <Router>
      <nav className="light-blue darken-4">
        <div className="nav-wrapper container">
          <Link className="brand-logo left" to="/">
            Главная
          </Link>
          {/* <a href="#" data-target="mobile-demo" className="sidenav-trigger"> */}
          {/* <i className="material-icons">menu</i>
          </a> */}
          <ul id="nav-mobile" className="right">
            <li>
              <Link to="/contacts">Контакты</Link>
            </li>
            {isAuthenticated ? (
              <li>
                <a href="#" onClick={onLogout}>
                  Выйти
                </a>
              </li>
            ) : (
              <li>
                <Link to="/login">Войти</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <ModalSwitch />
    </Router>
  );
};

const mapStateToProps = (state: StoreState): { isAuthenticated: boolean } => {
  return {
    isAuthenticated: state.fakeAuth.isAuthenticated,
  };
};

export const App = connect(mapStateToProps, { logout })(_App);
