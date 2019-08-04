import React, { useState } from 'react';
import { connect } from 'react-redux';

import Input from '@shared/Input/Input';
import Button from '@shared/Button/Button';
import { Form } from 'react-final-form';
import Dropdown from '@components/Dropdown/Dropdown';

import { RootState } from '@redux/reducer';
import { getHistory } from '@redux/history/actions';

type MapState = {
  history: Array<string>;
};

type Props = typeof mapDispatch & MapState;

const History: React.FC<Props> = ({ history, getHistory }) => {
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    getHistory();
  };

  const getResults = history.entries.map(({ id }) => (
    <a className="history__entry-title">{id}</a>
  ));

  return (
    <div className="history">
      <form onSubmit={handleSubmit}>
        <Input
          label="ID кондора"
          props={{ name: 'kondor', type: 'number', step: 1 }}
        />
        {/*
                <Dropdown
          name="sortBy"
          options={[
            { name: 'Дате', value: 'date' },
            { name: 'Кондор', value: 'kondor' }
          ]}
        />
        <Input label="Повышения" props={{ type: 'radio', name: 'order' }} />
        <Input label="Убывания" props={{ type: 'radio', name: 'order' }} />*/}
        <Button type="submit">Отправить</Button>
      </form>
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
