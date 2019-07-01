import React from 'react';

interface DropdownProps {
  options?: Array<string>;
}

const Dropdown: React.SFC<DropdownProps> = ({ options = [] }) => {
  const elements = options.map((option, index) => {
    if (index === 0) {
      return (
        <option selected={true} className="dropdown__option">
          {option}
        </option>
      );
    } else {
      return <option className="dropdown__option">{option}</option>;
    }
  });

  return (
    <div className="dropdown">
      <select className="dropdown__select">{elements}</select>
    </div>
  );
};

export default Dropdown;
