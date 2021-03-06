import * as React from 'react';
import { useState } from 'react';

import axios from 'axios';

import { Form, Input, Button } from '@shared/view';

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
        onSubmit={handleSubmit}
      >
        <Form.Header>
          <h2>Создание пользователя</h2>
        </Form.Header>
        <Form.Content>
          <Input label="Логин" name="login" required />
          <Input label="Имя" name="username" required />
          <Input label="Пароль" type="password" name="password" required />
        </Form.Content>
        <Form.Footer>
          <Button type="submit">Submit</Button>
        </Form.Footer>
      </Form>
    </div>
  );
};

export default CreateForm;
