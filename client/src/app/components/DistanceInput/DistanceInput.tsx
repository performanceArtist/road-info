import React, { useState } from 'react';

import { Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';

type Default = {
  meters: number;
  kilometers: number;
};

type Props = {
  defaults?: {
    from?: Default;
    to?: Default;
    distance?: number;
  };
};

const DistanceInput: React.FC<Props> = ({ defaults = {} }) => {
  const [distance, setDistance] = useState(defaults.distance || 0);

  const getInputs = (
    { name, title }: { name: string; title: string },
    { meters = 0, kilometers = 0 } = {}
  ) => (
    <>
      <div className="distance-input__title">{title}</div>
      <Field
        name={`${name}-km`}
        className="distance-input__input"
        component="input"
        type="number"
        defaultValue={kilometers}
        step={1}
        min={0}
      />
      <span className="distance-input__units">км +</span>
      <Field
        name={`${name}-m`}
        className="distance-input__input"
        component="input"
        type="number"
        step={100}
        defaultValue={meters}
        min={0}
      />
      <span className="distance-input__units">м</span>
    </>
  );

  return (
    <div className="distance-input">
      <div className="distance-input__wrapper">
        <div
          className="distance-input__column"
          onChange={event => console.log(event.target)}
        >
          <div className="distance-input__row">
            {getInputs(
              { name: 'from', title: 'Начало измерения' },
              defaults.from
            )}
          </div>
          <div className="distance-input__row">
            {getInputs({ name: 'to', title: 'Конец измерения' }, defaults.to)}
          </div>
        </div>
        <div className="distance-input__column">
          <div className="distance-input__result">
            <div>Дистанция</div>
            <div className="distance-input__distance">{distance}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistanceInput;
