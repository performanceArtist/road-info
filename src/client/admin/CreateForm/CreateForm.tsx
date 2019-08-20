import * as React from 'react';
import { useState } from 'react';

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

const CreateForm: React.FC = () => {
  const [status, setStatus] = useState({ error: false, message: '' });

  const handleSubmit = async (event: React.SyntheticEvent) => {
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
      await axios.post('/admin/create', formData);
      setStatus({ error: false, message: 'Пользователь создан успешно' });
    } catch ({ response }) {
      console.log(response);
      setStatus({ error: true, message: 'Ошибка создания пользователя' });
    }
  };

  return (
    <div className="create-form">
      <Form
        status={status.message}
        error={status.error}
        props={{ onSubmit: handleSubmit }}
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
};

export default CreateForm;
