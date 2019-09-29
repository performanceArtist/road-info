import * as React from 'react';

type Props = {
  status?: string | null;
  label?: string | null;
  error?: boolean;
  modifier?: 'inline';
  remWidth?: number;
  props?: Object;
};

const Input: React.FC<Props> = ({
  status = null,
  label = null,
  error = false,
  modifier = null,
  remWidth = null,
  props = {}
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
