import * as React from 'react';

type IProps = {
  status?: string | null;
  label?: string | null;
  error?: boolean;
  modifier?: 'inline';
  remWidth?: number;
};

type RawInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<IProps & RawInputProps> = ({
  status = null,
  label = null,
  error = false,
  modifier = null,
  remWidth = null,
  type = 'text',
  ...props
}) => (
  <label className={modifier ? `input input_${modifier}` : 'input'}>
    {label ? <div className="input__label">{label}</div> : null}
    <input
      {...props}
      className={error ? 'input__input input__input_invalid' : 'input__input'}
      style={{ width: `${remWidth}rem` }}
    />
    {status && <div className="input__input-status">{status}</div>}
  </label>
);

export default Input;
