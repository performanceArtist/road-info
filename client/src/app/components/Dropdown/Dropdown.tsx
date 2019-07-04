import React from 'react';
import uuid from 'short-uuid';

interface DropdownProps {
  name?: string;
  label?: string;
  options?: Array<string>;
}

const Dropdown: React.SFC<DropdownProps> = ({
  name = 'select',
  label = '',
  options = []
}) => {
  const elements = options.map((option, index) => {
    if (index === 0) {
      return (
        <option
          className="dropdown__option"
          key={uuid.generate()}
          selected={true}
        >
          {option}
        </option>
      );
    } else {
      return (
        <option className="dropdown__option" key={uuid.generate()}>
          {option}
        </option>
      );
    }
  });

  return (
    <div className="dropdown">
      <div className="dropdown__label">{label}</div>
      <div className="dropdown__dropdown">
        <select className="dropdown__select" name={name}>
          {elements}
        </select>
      </div>
    </div>
  );
};

export default Dropdown;
