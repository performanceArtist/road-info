import React from 'react';

interface ButtonProps {
  handleClick?(): void;
  disabled?: boolean;
  text?: string;
}

const Button: React.SFC<ButtonProps> = ({
  onClick = () => {
    console.log('hmm');
  },
  disabled = false,
  text = 'Click me'
}) => (
  <button
    type="button"
    className={disabled ? 'button button_disabled' : 'button'}
    disabled={disabled}
    onClick={onClick}
  >
    {text}
  </button>
);

export default Button;
