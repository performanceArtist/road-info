import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import SuggestionInput from '@components/SuggestionInput/SuggestionInput';
import { Suggestion } from '@redux/suggestion/types';
import {
  getSuggestion,
  addConstraint,
  addLast
} from '@redux/suggestion/actions';

type OwnProps = {
  form: string;
  suggestions: Suggestion;
  defaults?: { [key: string]: string };
  addressRequired?: boolean;
};

type Props = OwnProps & typeof mapDispatch;

const AddressInputs: React.FC<Props> = ({
  suggestions,
  defaults = null,
  form,
  addressRequired = true,
  getSuggestion,
  addConstraint,
  addLast
}) => {
  useEffect(() => {
    inputs.forEach(({ name }) => {
      getConstraintTargets(name).forEach(target => {
        const id = getDefaultValue(name) ? getDefaultValue(name).id : '';
        addConstraint({ form, name, target, id });
      });
    });
  }, []);

  const getConstraintTargets = (name: string) => {
    switch (name) {
      case 'region':
        return ['city', 'settlement', 'street'];
      case 'city':
        return ['street', 'settlement'];
      case 'settlement':
        return ['street'];
      default:
        return [];
    }
  };

  const inputs = [
    { name: 'region', label: 'Область' },
    {
      name: 'city',
      label: 'Город'
    },
    {
      name: 'settlement',
      required: false,
      label: 'Населённый пункт'
    },
    { name: 'street', label: 'Дорога' }
  ];

  const addConstraints = (name: string) => {
    getConstraintTargets(name).forEach(target => {
      addConstraint({ form, name, target, id: null });
    });

    if (name === 'settlement') {
      const latestCity = suggestions.city.last;

      getConstraintTargets('city').forEach(target => {
        addConstraint({
          form,
          name: 'city',
          target,
          id: latestCity && latestCity.id
        });
      });
    }
  };

  const handleChange = ({ name, value }: { name: string; value: string }) => {
    addConstraints(name);
    getSuggestion({ form, name, value });
  };

  const handleSuggestionClick = ({ name, value, id }) => {
    addLast({ form, name, value, id });
    getConstraintTargets(name).forEach(target => {
      addConstraint({ form, name, target, id });
    });
  };

  const getDefaultValue = (name: string) => {
    return defaults
      ? { value: defaults[name], id: defaults[`${name}Id`] }
      : suggestions[name] && suggestions[name].last;
  };

  const elements = inputs.map(({ name, label, required = true }) => (
    <div className="address-inputs__input">
      <SuggestionInput
        name={name}
        label={label}
        defaultValue={getDefaultValue(name)}
        suggestions={suggestions[name] ? suggestions[name].items : []}
        required={addressRequired && required}
        onChange={handleChange}
        onSuggestionClick={handleSuggestionClick}
      />
    </div>
  ));

  return <div className="address-inputs">{elements}</div>;
};

const mapDispatch = { getSuggestion, addConstraint, addLast };

export default connect(
  null,
  mapDispatch
)(AddressInputs);
