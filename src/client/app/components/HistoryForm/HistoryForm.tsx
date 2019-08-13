import * as React from 'react';
import { connect } from 'react-redux';

import { Form, Field } from 'react-final-form';
import FinalInput from '@shared/Input/Input';
import Button from '@shared/Button/Button';

import { RootState } from '@redux/reducer';
import {
  getHistory,
  setStartDate,
  setEndDate,
  setKondor
} from '@redux/history/actions';
import AddressInputs from '@components/AddressInputs/AddressInputs';
import MyDatePicker from '@components/DatePicker/DatePicker';

import { Suggestion } from '@redux/suggestion/types';
import { Filters } from '@redux/history/types';

type MapState = {
  suggestions: Suggestion;
  filters: Filters;
};

type Props = typeof mapDispatch & MapState;

const History: React.FC<Props> = ({
  suggestions,
  filters,
  getHistory,
  setStartDate,
  setEndDate,
  setKondor
}) => {
  const handleSubmit = async (values: any) => {
    console.log(values);
    //getHistory();
  };

  return (
    <div className="history-form">
      <Form
        onSubmit={handleSubmit}
        initialValues={{ kondor: filters.kondor }}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="kondor"
              component="input"
              type="number"
              onChange={(id: number | string) => setKondor(id)}
              step={1}
            />
            <div className="history-form__datepickers">
              <div className="history-form__datepicker">
                От{' '}
                <MyDatePicker
                  startDate={new Date(filters.startDate)}
                  handleChange={(date: Date) =>
                    date < filters.endDate && setStartDate(date)
                  }
                />
              </div>
              <div className="history-form__datepicker">
                До{' '}
                <MyDatePicker
                  startDate={new Date(filters.endDate)}
                  handleChange={(date: Date) =>
                    date > filters.startDate && setEndDate(date)
                  }
                />
              </div>
            </div>
            <AddressInputs form="history" suggestions={suggestions} />
            <div className="history-form__submit">
              <Button type="submit">Отправить</Button>
            </div>
          </form>
        )}
      />
    </div>
  );
};

const mapState = ({ history: { filters }, suggestions }: RootState) => ({
  filters,
  suggestions: suggestions.history
});

const mapDispatch = { getHistory, setStartDate, setEndDate, setKondor };

export default connect(
  mapState,
  mapDispatch
)(History);
