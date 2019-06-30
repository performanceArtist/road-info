import React from 'react';

interface DropdownProps {
  options?: Array<string>;
}

const Dropdown: React.SFC<DropdownProps> = ({ options = [] }) => (
  <div className="dropdown">
    <select className="dropdown__select">
      <option
        disabled={true}
        className="dropdown__option dropdown__option_disabled"
      >
        Choose an option
      </option>
      {options.map(option => (
        <option className="dropdown__option">{option}</option>
      ))}
    </select>
  </div>
);

export default Dropdown;
