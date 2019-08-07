import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Form } from 'react-final-form';
import FinalInput from '@shared/Input/Input';
import Button from '@shared/Button/Button';
import Dropdown from '@components/Dropdown/Dropdown';

import { RootState } from '@redux/reducer';
import { getHistory } from '@redux/history/actions';
import SuggestionInput from '@components/SuggestionInput/SuggestionInput';

type MapState = {
  history: any;
};

type Props = typeof mapDispatch & MapState;

const History: React.FC<Props> = ({ history, getHistory }) => {
  const handleSubmit = async values => {
    console.log(values);
    getHistory();
  };

  const getResults = history.entries.map(({ id }) => (
    <a className="history__entry-title">{id}</a>
  ));

  return (
    <div className="history">
      <div className="history__form">
        <Form
          onSubmit={handleSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <FinalInput
                name="kondor"
                label="ID кондора"
                type="number"
                step={1}
              />
              <div className="history__date-container">
                <div>За период</div>
                <div className="history__date-inputs">
                  <FinalInput name="date-start" label="От" type="date" />
                  <FinalInput name="date-end" label="До" type="date" />
                </div>
              </div>
              <Button type="submit">Отправить</Button>
            </form>
          )}
        />
      </div>
      <div className="history__results">{getResults}</div>
    </div>
  );
};

const mapState = ({ history }: RootState) => ({
  history
});

const mapDispatch = { getHistory };

export default connect(
  mapState,
  mapDispatch
)(History);
