import * as React from 'react';
import { useState, useEffect } from 'react';

import { Field } from 'react-final-form';
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
  required?: boolean;
  onSuggestionClick?: (arg: {
    id: string;
    value: string;
    name: string;
  }) => void;
  onChange?: (arg: { value: string; name: string }) => void;
};

const SuggestionInput: React.FC<Props> = ({
  name = '',
  label = '',
  suggestions = [],
  defaultValue = null,
  required = true,
  onSuggestionClick = () => {},
  onChange = () => {}
}) => {
  const [value, setValue] = useState(defaultValue || {});
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const hide = (event: React.MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.className !== 'suggestion-input') setShowSuggestions(false);
    };

    window.addEventListener('click', hide);
    return () => {
      window.removeEventListener('click', hide);
    };
  });

  const suggestionItems = suggestions.map(({ value, id }) => (
    <li
      className="suggestion-input__suggestion"
      onClick={() => {
        setValue({ value, id });
        setShowSuggestions(false);
        onSuggestionClick({ name, value, id });
      }}
    >
      {value}
    </li>
  ));

  return (
    <div className="suggestion-input">
      <FinalInput
        defaultValue={value.value}
        name={name}
        label={label}
        remWidth={13}
        onDoubleClick={() => setShowSuggestions(true)}
        onChange={value => {
          //setValue({ value, id: '' });
          setShowSuggestions(!showSuggestions);
          onChange({ value, name });
        }}
        required={required}
      />
      <Field
        name={`${name}Id`}
        component="input"
        type="hidden"
        defaultValue={value.id}
      />
      {showSuggestions && suggestions.length !== 0 && (
        <ul className="suggestion-input__suggestion-list">{suggestionItems}</ul>
      )}
    </div>
  );
};

export default SuggestionInput;
