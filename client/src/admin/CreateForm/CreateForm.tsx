import React from 'react';

import axios from 'axios';

import Form from '@shared/Form/Form';
import Input from '@shared/Input/Input';
import Button from '@shared/Button/Button';

interface UserType {
  login: string;
  name: string;
  password: string;
  group_id: number;
}

class CreateForm extends React.Component<
  {},
  { apiStatus: { error: boolean; message: null | string } }
> {
  constructor(props: {}) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      apiStatus: { error: false, message: null }
    };
  }

  async handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    const target = event.target as HTMLFormElement;
    const { login, username, password } = target;

    const formData: UserType = {
      login: login.value,
      name: username.value,
      password: password.value,
      group_id: 1
    };

    try {
      const res = await axios.post('/admin/create', formData);
      if (res.data.status === 'ok') {
        this.setState({
          apiStatus: { error: false, message: 'Пользователь создан успешно' }
        });
      } else {
        this.setState({
          apiStatus: { error: true, message: 'Ошибка создания пользователя' }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { apiStatus } = this.state;

    return (
      <div className="create-form">
        <Form
          status={apiStatus.message}
          error={apiStatus.error}
          props={{ onSubmit: this.handleSubmit }}
        >
          <Form.Header>
            <h2>Создание пользователя</h2>
          </Form.Header>
          <Form.Content>
            <Input
              label="Логин"
              props={{
                type: 'text',
                name: 'login',
                required: true
              }}
            />
            <Input
              label="Имя"
              props={{
                type: 'text',
                name: 'username',
                required: true
              }}
            />
            <Input
              label="Пароль"
              props={{
                type: 'password',
                name: 'password',
                required: true
              }}
            />
          </Form.Content>
          <Form.Footer>
            <Button type="submit">Submit</Button>
          </Form.Footer>
        </Form>
      </div>
    );
  }
}

export default CreateForm;
