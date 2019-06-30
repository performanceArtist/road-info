import React from 'react';

import { post } from 'axios';

import Form from '../../shared/Form/Form';
import Input from '../../shared/Input/Input';

interface UserType {
  login: string;
  name: string;
  password: string;
  group_id: number;
}

class CreateForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();

    const inputs = event.target.elements;

    const formData: UserType = {
      login: inputs.login.value,
      name: inputs.name.value,
      password: inputs.password.value,
      group_id: 1
    };

    try {
      await post('/admin/create', formData);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="create-form">
        <Form props={{ onSubmit: this.handleSubmit }}>
          <Form.Header>
            <h2>Create user</h2>
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
                name: 'name',
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
            <button type="submit">Submit</button>
          </Form.Footer>
        </Form>
      </div>
    );
  }
}

export default CreateForm;
