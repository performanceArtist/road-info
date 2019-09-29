import * as React from 'react';
import axios from 'axios';

import { Form, Input, Button } from '@shared/view';

interface State {
  networkError: string | null;
  loginError: string | null;
  passwordError: string | null;
}

class Login extends React.Component<{}, State> {
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

    const target = event.target as HTMLFormElement;
    const { username, password } = target;
    const formData = { username: username.value, password: password.value };

    try {
      const response = await axios.post('/login', formData);
      const { token, login } = response.data;

      this.setCookie('token', token, 10);
      this.setCookie('login', login, 10);
      window.location.href = '/';
    } catch ({ response }) {
      console.log(response);
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
              <div className="login__input">
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
              </div>
              <div className="login__input">
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
              </div>
            </Form.Content>
            <Form.Footer>
              <div className="login__submit-container">
                <Button type="submit">Ok</Button>
              </div>
            </Form.Footer>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
