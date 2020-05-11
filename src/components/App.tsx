import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';
import { ContactsPage } from './ContactsPage';
import { Modal } from './Modal';

export const App: React.FC = () => {
  return (
    <Router>
      <ModalSwitch />
    </Router>
  );
};

const HomePage: React.FC = () => {
  return (
    <div>
      <Link to="/contacts">Контакты</Link>
      <Link to="/login">Войти</Link>
    </div>
  );
};

interface ModalLocationState {
  background?: any;
}

const ModalSwitch: React.FC = () => {
  let location = useLocation<ModalLocationState>();
  let background = location.state && location.state.background;
  return (
    <div>
      <Switch location={background || location}>
        <Route exact path="/" children={<HomePage />} />
        <Route path="/contacts" children={<ContactsPage />} />
      </Switch>
      {background && <Route path="/contacts/:id" children={<Modal />} />}
    </div>
  );
};
