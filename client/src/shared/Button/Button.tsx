import React from 'react';

import './button.scss';

interface Props {
  type?: 'button' | 'submit';
  onClick?: (event?: React.SyntheticEvent) => void;
  disabled?: boolean;
}

const Button: React.SFC<Props> = ({
  onClick = () => {},
  disabled = false,
  type = 'button',
  children = null
}) => (
  <button
    type={type}
    className={disabled ? 'button button_disabled' : 'button'}
    disabled={disabled}
    onClick={onClick}
  >
    {children || 'Click me'}
  </button>
);

export default Button;
