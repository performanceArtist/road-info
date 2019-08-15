import * as React from 'react';
import { Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';

type Props = {
  name: string;
  component?: 'input' | 'select' | 'textarea';
  type?: 'text' | 'number' | 'radio' | 'checkbox';
  remWidth?: number;
  modifier?: 'inline';
  status?: string | null;
  label?: string | null;
  error?: boolean;
  required?: boolean;
  defaultValue?: string | number;
  autoComplete?: string;
  onChange?: (value: any, name: string) => void;
  [key: string]: any;
};

const FinalInput: React.FC<Props> = ({
  name,
  defaultValue,
  component = 'input',
  type = 'text',
  modifier = null,
  remWidth = null,
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
      type={type}
      component={component}
      className={error ? 'input__input input__input_invalid' : 'input__input'}
      required={required}
      defaultValue={defaultValue}
      autoComplete={autoComplete}
      style={{ width: `${remWidth}rem` }}
      {...rest}
    />
    <OnChange name={name}>{(value: any) => onChange(value, name)}</OnChange>
    {status && <div className="input__input-status">{status}</div>}
  </label>
);

export default FinalInput;
