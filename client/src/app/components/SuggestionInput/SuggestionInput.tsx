import React, { useState, useEffect } from 'react';

import FinalInput from '@shared/FinalInput/FinalInput';

type Suggestion = {
  value: string;
  id: string;
};

type Props = {
  name?: string;
  label?: string;
  defaultValue?: string;
  suggestions?: Array<Suggestion>;
  onSuggestionClick?: (arg: { id: string; name: string }) => void;
  onChange?: (arg: { value: string; name: string }) => void;
};

const SuggestionInput: React.FC<Props> = ({
  name = '',
  label = '',
  suggestions = [],
  defaultValue = null,
  onSuggestionClick = () => {},
  onChange = () => {}
}) => {
  const [value, setValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  /*
  useEffect(() => {
    const hide = () => setShowSuggestions(false);
    window.addEventListener('click', hide);
    return () => {
      window.removeEventListener('click', hide);
    };
  });*/

  const suggestionItems = suggestions.map(({ value, id }) => (
    <li
      className="suggestion-input__suggestion"
      onClick={() => {
        setValue(value);
        setShowSuggestions(false);
        onSuggestionClick({ name, id });
      }}
    >
      {value}
    </li>
  ));

  return (
    <div className="suggestion-input">
      <FinalInput
        defaultValue={defaultValue || value}
        name={name}
        label={label}
        onDoubleClick={() => setShowSuggestions(true)}
        onChange={value => {
          setShowSuggestions(!showSuggestions);
          onChange({ value, name });
        }}
      />
      {showSuggestions && suggestions.length !== 0 && (
        <ul className="suggestion-input__suggestion-list">{suggestionItems}</ul>
      )}
    </div>
  );
};

export default SuggestionInput;
