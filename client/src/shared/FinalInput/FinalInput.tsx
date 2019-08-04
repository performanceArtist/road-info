import React from 'react';
import { Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';

import './final-input.scss';

type Props = {
  name: string;
  component?: 'input' | 'select' | 'textarea';
  type?: 'text' | 'number' | 'radio' | 'checkbox';
  status?: string | null;
  label?: string | null;
  error?: boolean;
  required?: boolean;
  defaultValue?: string | number;
  autoComplete?: string;
  onChange?: (value: string) => void;
  [key: string]: any;
};

const FinalInput: React.FC<Props> = ({
  name,
  defaultValue,
  component = 'input',
  type = 'text',
  status = null,
  label = null,
  error = false,
  required = false,
  autoComplete = 'off',
  onChange = () => {},
  ...rest
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
      autoComplete={autoComplete}
      {...rest}
    />
    <OnChange name={name}>
      {(value, previous) => onChange(value, name)}
    </OnChange>
    {status && <div className="input__input-status">{status}</div>}
  </label>
);

export default FinalInput;
