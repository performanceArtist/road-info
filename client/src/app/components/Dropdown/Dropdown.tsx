import React from 'react';
import uuid from 'short-uuid';

interface DropdownProps {
  options?: Array<string>;
}

const Dropdown: React.SFC<DropdownProps> = ({ options = [] }) => {
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
      <select className="dropdown__select">{elements}</select>
    </div>
  );
};

export default Dropdown;
