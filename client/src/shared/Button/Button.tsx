import React from 'react';

import './button.scss';

type Props = {
  type?: 'button' | 'submit';
  onClick?: (event?: React.MouseEvent) => void;
  disabled?: boolean;
};

const Button: React.FC<Props> = ({
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
