import React from 'react';

import { Input } from '@shared/view';

interface IProps {
  isActive?: boolean;
  label?: string;
  name: string;
  value?: string;
}

const ActivatedInput: React.FC<IProps> = ({
  isActive = false,
  label = '',
  name = '',
  value = ''
}) => {
  return (
    <div
      className={
        isActive ? 'activated-input activated-input_active' : 'activated-input'
      }
    >
      <Input
        label={label}
        name={name}
        value={value}
        type="text"
        required
        readOnly
        disabled={!isActive}
        remWidth={18.5}
      />
    </div>
  );
};

export default ActivatedInput;
