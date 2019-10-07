import * as React from 'react';

type Props = {};

type RawButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button: React.FC<Props & RawButtonProps> = ({
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
