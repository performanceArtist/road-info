import React from 'react';

import { Field } from 'react-final-form';

const DistanceInput: React.FC = () => {
  const getInputs = ({ name, title }) => (
    <>
      <div className="distance-input__title">{title}</div>
      <Field
        name={`${name}-km`}
        className="distance-input__input"
        component="input"
        type="number"
        min={0}
      />
      <span className="distance-input__units">км +</span>
      <Field
        name={`${name}-m`}
        className="distance-input__input"
        component="input"
        type="number"
        min={0}
      />
      <span className="distance-input__units">м</span>
    </>
  );

  return (
    <div className="distance-input">
      <div className="distance-input__wrapper">
        <div className="distance-input__column">
          <div className="distance-input__row">
            {getInputs({ name: 'from', title: 'Начало измерения' })}
          </div>
          <div className="distance-input__row">
            {getInputs({ name: 'to', title: 'Конец измерения' })}
          </div>
        </div>
        <div className="distance-input__column">
          <div className="distance-input__result">
            <div>Дистанция:</div>
            <div className="distance-input__distance">123</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistanceInput;
