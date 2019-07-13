import React from 'react';
import uuid from 'short-uuid';

interface Props {
  name?: string;
  value?: string;
  label?: string;
  options?: Array<{ name: string; value: string }>;
  onChange?: (event?: React.SyntheticEvent) => void;
}

const Dropdown: React.SFC<Props> = ({
  name = 'select',
  value = '',
  label = '',
  options = [],
  onChange = () => {}
}) => {
  const elements = options.map(({ name, value }) => (
    <option value={value} className="dropdown__option" key={uuid.generate()}>
      {name}
    </option>
  ));

  return (
    <div className="dropdown">
      <div className="dropdown__label">{label}</div>
      <div className="dropdown__dropdown">
        <select
          className="dropdown__select"
          value={value}
          name={name}
          onChange={onChange}
        >
          {elements}
        </select>
      </div>
    </div>
  );
};

export default Dropdown;
