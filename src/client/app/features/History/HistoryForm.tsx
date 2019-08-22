import * as React from 'react';
import { connect } from 'react-redux';

import { Form } from 'react-final-form';
import Button from '@shared/Button/Button';

import {
  getHistory,
  setStartDate,
  setEndDate,
  setKondor
} from '@redux/history/actions';
import DateRange from '@components/DateRange/DateRange';

import { Suggestion } from '@redux/suggestion/types';
import { Filters } from '@redux/history/types';

type OwnProps = {
  suggestions: Suggestion;
  filters: Filters;
};

type Props = typeof mapDispatch & OwnProps;

const History: React.FC<Props> = ({
  suggestions,
  filters,
  getHistory,
  setStartDate,
  setEndDate,
  setKondor
}) => {
  const handleSubmit = async (addressValues: any) => {
    getHistory({ ...filters, ...addressValues });
  };

  return (
    <div className="history-form">
      <Form
        onSubmit={handleSubmit}
        initialValues={{ kondor: filters.kondor }}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <DateRange
              startDate={filters.startDate}
              endDate={filters.endDate}
              onStartChange={setStartDate}
              onEndChange={setEndDate}
            />
            <div>Кондор</div>
            <input
              name="kondor"
              type="number"
              value={filters.kondor}
              onChange={event => setKondor(event.target.value)}
              step={1}
            />
            {/*
            <AddressInputs
              form="history"
              addressRequired={false}
              suggestions={suggestions}
            />*/}
            <div className="history-form__submit">
              <Button type="submit">Отправить</Button>
            </div>
          </form>
        )}
      />
    </div>
  );
};

const mapDispatch = { getHistory, setStartDate, setEndDate, setKondor };

export default connect(
  null,
  mapDispatch
)(History);
