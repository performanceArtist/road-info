import React from 'react';

import './button.scss';

interface ButtonProps {
  type?: string;
  handleClick?(): void;
  disabled?: boolean;
  text?: string;
}

const Button: React.SFC<ButtonProps> = ({
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
