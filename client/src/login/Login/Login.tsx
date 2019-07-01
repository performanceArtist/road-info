import React from 'react';
import axios from 'axios';

import Form from '@shared/Form/Form';
import Input from '@shared/Input/Input';

interface LoginState {
  networkError: string | null;
  loginError: string | null;
  passwordError: string | null;
}

class Login extends React.Component<{}, LoginState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      networkError: null,
      loginError: null,
      passwordError: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setCookie(name: string, value: string, exdays: number) {
    const date = new Date();
    date.setTime(date.getTime() + exdays * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
  }

  async handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    const { username, password } = event.target.elements;
    const data = { username: username.value, password: password.value };

    try {
      const response = await axios.post('/login', data);
      const { token, login, status } = response.data;

      if (!token || !login || status === 'error') {
        const { type, message } = response.data.error;
        switch (type) {
          case 'login':
            this.setState({ loginError: message });
            break;
          case 'password':
            this.setState({ passwordError: message });
            break;
          default:
            console.log(response.data);
            break;
        }
      } else {
        this.setCookie('token', token, 10);
        this.setCookie('login', login, 10);
        window.location.href = '/';
      }
    } catch (error) {
      this.setState({
        networkError: 'Ошибка запроса'
      });
      console.log(error);
    }
  }

  render() {
    const { networkError, loginError, passwordError } = this.state;

    return (
      <div className="login">
        <div className="login__wrapper">
          <Form
            status={networkError}
            error={networkError ? true : false}
            props={{ onSubmit: this.handleSubmit }}
          >
            <Form.Header>
              <div className="login__title">Вход</div>
            </Form.Header>
            <Form.Content>
              <Input
                status={loginError}
                error={loginError ? true : false}
                props={{
                  type: 'text',
                  name: 'username',
                  placeholder: 'Логин',
                  required: true,
                  onChange: () => this.setState({ loginError: null })
                }}
              />
              <Input
                status={passwordError}
                error={passwordError ? true : false}
                props={{
                  type: 'password',
                  name: 'password',
                  placeholder: 'Пароль',
                  required: true,
                  onChange: () => this.setState({ passwordError: null })
                }}
              />
            </Form.Content>
            <Form.Footer>
              <div className="login__submit-container">
                <button className="login__submit" type="submit">
                  Ok
                </button>
              </div>
            </Form.Footer>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
