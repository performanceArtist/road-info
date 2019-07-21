import React from 'react';
import { Field } from 'react-final-form';

import './final-input.scss';

type Props = {
  name: string;
  component?: 'input' | 'select' | 'textarea';
  type?: 'text' | 'number';
  status?: string | null;
  label?: string | null;
  error?: boolean;
};

const Input: React.FC<Props> = ({
  name,
  component = 'input',
  type = 'text',
  status = null,
  label = null,
  error = false
}) => (
  <label className="input">
    {label ? <div className="input__label">{label}</div> : null}
    <Field
      name={name}
      type={type}
      component={component}
      className={error ? 'input__input input__input_invalid' : 'input__input'}
    />
    <div className="input__input-status">{status}</div>
  </label>
);

export default Input;
