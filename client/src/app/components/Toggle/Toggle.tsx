import React from 'react';

enum ToggleType {
  RADIO = 'radio',
  CHECKBOX = 'checkbox'
}

interface ToggleProps {
  handleChange?(): void;
  type?: ToggleType;
  checked?: boolean;
  label?: string;
}

const Toggle: React.SFC<ToggleProps> = ({
  handleChange = () => {},
  type = ToggleType.CHECKBOX,
  checked = false,
  label = ''
}) => (
  <label className="toggle">
    <input
      type={type}
      defaultChecked={checked}
      onChange={handleChange}
      className="toggle__input"
    />
    <div className="toggle__switch" />
    <span className="toggle__label">{label}</span>
  </label>
);

export { Toggle, ToggleType };
