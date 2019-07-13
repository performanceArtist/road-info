import React from 'react';

enum ToggleType {
  RADIO = 'radio',
  CHECKBOX = 'checkbox'
}

interface Props {
  onChange?: (event?: React.SyntheticEvent) => void;
  type?: ToggleType;
  checked?: boolean;
  label?: string;
  name?: string;
}

const Toggle: React.SFC<Props> = ({
  onChange = () => {},
  type = ToggleType.CHECKBOX,
  checked = false,
  label = '',
  name = ''
}) => (
  <label className="toggle">
    <input
      type={type}
      name={name}
      defaultChecked={checked}
      onChange={onChange}
      className="toggle__input"
    />
    <div className="toggle__switch" />
    <span className="toggle__label">{label}</span>
  </label>
);

export { Toggle, ToggleType };
