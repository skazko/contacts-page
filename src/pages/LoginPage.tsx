import React, { useState } from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../actions';
import { useHistory, useLocation } from 'react-router-dom';
import { StoreState } from '../reducers';

interface LoginPageProps {
  wrongShots: number;
  authenticate: Function;
}

const _LoginPage: React.FC<LoginPageProps> = ({ authenticate, wrongShots }) => {
  const history = useHistory();
  const location = useLocation<{ from: { pathname: string } }>();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.target.value);
  };

  const { from } = location.state || { from: { pathname: '/' } };

  const login = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    authenticate({
      password,
      username,
      cb: () => {
        history.replace(from);
      },
    });
  };

  return (
    <div className="container ">
      <form className="Login z-depth-4">
        <h3>Вход</h3>
        <div className="input-field">
          <input onChange={onUsernameChange} id="username" type="text" />
          <label htmlFor="username">Username</label>
        </div>
        <div className="input-field">
          <input onChange={onPasswordChange} id="password" type="password" />
          <label htmlFor="password">Password</label>
        </div>

        {wrongShots > 0 && (
          <div className="left-align deep-orange-text text-darken-4">
            <b className="">Данные для входа</b>
            <div>username: user</div>
            <div>password: user</div>
          </div>
        )}

        <button onClick={login} className="btn orange accent-4">
          Войти
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state: StoreState): { wrongShots: number } => {
  return {
    wrongShots: state.fakeAuth.wrongShots,
  };
};

export const LoginPage = connect(mapStateToProps, { authenticate })(_LoginPage);
