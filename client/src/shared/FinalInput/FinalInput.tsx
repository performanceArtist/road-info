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
  required?: boolean;
  defaultValue?: string | number;
};

const Input: React.FC<Props> = ({
  name,
  defaultValue,
  component = 'input',
  type = 'text',
  status = null,
  label = null,
  error = false,
  required = false
}) => (
  <label className="input">
    {label ? <div className="input__label">{label}</div> : null}
    <Field
      name={name}
      defaultValue={defaultValue}
      type={type}
      component={component}
      className={error ? 'input__input input__input_invalid' : 'input__input'}
      required={required}
    />
    <div className="input__input-status">{status}</div>
  </label>
);

export default Input;
