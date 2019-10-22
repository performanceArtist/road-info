import * as React from 'react';
import { connect } from 'react-redux';

import { Form } from 'react-final-form';

import { Input, Button } from '@shared/view';

import {
  getOrders,
  setStartDate,
  setEndDate,
  setCondor
} from '@features/History/redux/actions';
import DateRange from '@components/DateRange/DateRange';

import { Suggestion } from '@redux/suggestion/types';
import { HistoryFilters } from '@shared/types';

type OwnProps = {
  suggestions: Suggestion;
  filters: HistoryFilters;
};

type Props = typeof mapDispatch & OwnProps;

const History: React.FC<Props> = ({
  suggestions,
  filters,
  getOrders,
  setStartDate,
  setEndDate,
  setCondor
}) => {
  const handleSubmit = async (addressValues: any) => {
    getOrders({ ...filters, ...addressValues });
  };

  return (
    <div className="history-form">
      <Form
        onSubmit={handleSubmit}
        initialValues={{ condor: filters.condor }}
        render={({ handleSubmit }) => (
          <form className="history-form__form" onSubmit={handleSubmit}>
            <DateRange
              startDate={filters.startDate}
              endDate={filters.endDate}
              onStartChange={setStartDate}
              onEndChange={setEndDate}
            />
            <Input
              label="Кондор"
              name="condor"
              type="number"
              value={filters.condor}
              onChange={event => setCondor(event.target.value)}
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

const mapDispatch = { getOrders, setStartDate, setEndDate, setCondor };

export default connect(
  null,
  mapDispatch
)(History);
