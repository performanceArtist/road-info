import React, { useState, useEffect } from 'react';

import FinalInput from '@shared/FinalInput/FinalInput';

type Props = {
  name?: string;
  label?: string;
  defaultValue?: string;
  suggestions?: Array<string>;
  onChange?: (event?: React.SyntheticEvent) => void;
};

const SuggestionInput: React.FC<Props> = ({
  name = '',
  label = '',
  suggestions = [],
  onChange = () => {}
}) => {
  const [value, setValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);

  /*
  useEffect(() => {
    const hide = () => setShowSuggestions(false);
    window.addEventListener('click', hide);
    return () => {
      window.removeEventListener('click', hide);
    };
  });*/

  const suggestionItems = suggestions.map(suggestion => (
    <li
      className="suggestion-input__suggestion"
      onClick={() => {
        setValue(suggestion);
        setShowSuggestions(false);
      }}
    >
      {suggestion}
    </li>
  ));

  return (
    <div className="suggestion-input">
      <FinalInput
        defaultValue={value}
        name={name}
        label={label}
        onDoubleClick={() => setShowSuggestions(true)}
        onChange={(value, name) => {
          setShowSuggestions(true);
          onChange(value, name);
        }}
      />
      {showSuggestions && suggestions.length !== 0 && (
        <ul className="suggestion-input__suggestion-list">{suggestionItems}</ul>
      )}
    </div>
  );
};

export default SuggestionInput;
