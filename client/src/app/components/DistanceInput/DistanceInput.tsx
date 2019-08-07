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
  };
};

const DistanceInput: React.FC<Props> = ({ defaults = {} }) => {
  const convertToDistance = ({ meters = 0, kilometers = 0 } = {}) =>
    Math.abs(kilometers * 1000 + meters);

  const [fromDistance, setFromDistance] = useState(
    convertToDistance(defaults.from)
  );
  const [toDistance, setToDistance] = useState(convertToDistance(defaults.to));

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

      <OnChange name={`${name}-km`}>
        {(value: number) => {
          if (name === 'to') {
            setToDistance((toDistance % 1000) + value * 1000);
          } else {
            setFromDistance((fromDistance % 1000) + value * 1000);
          }
        }}
      </OnChange>

      <span className="distance-input__units">км +</span>
      <Field
        name={`${name}-m`}
        className="distance-input__input"
        component="input"
        type="number"
        defaultValue={meters}
        step={100}
        min={0}
        max={900}
      />
      <span className="distance-input__units">м</span>

      <OnChange name={`${name}-m`}>
        {(value: number) => {
          if (name === 'to') {
            setToDistance(Math.floor(toDistance / 1000) + value);
          } else {
            setFromDistance(Math.floor(fromDistance / 1000) + value);
          }
        }}
      </OnChange>
    </>
  );

  return (
    <div className="distance-input">
      <div className="distance-input__wrapper">
        <div className="distance-input__column">
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
            <input
              name="distance"
              value={Math.abs(toDistance - fromDistance)}
              className="distance-input__distance"
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistanceInput;
