import React from 'react';

import './input.scss';

type Props = {
  status?: string | null;
  label?: string | null;
  error?: boolean;
  props?: Object;
};

const Input: React.FC<Props> = ({
  status = null,
  label = null,
  error = false,
  props = {}
}) => (
  <label className="input">
    {label ? <div className="input__label">{label}</div> : null}
    <input
      {...props}
      className={error ? 'input__input input__input_invalid' : 'input__input'}
    />
    {status && <div className="input__input-status">{status}</div>}
  </label>
);

export default Input;
