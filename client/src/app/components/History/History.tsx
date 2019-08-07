import React from 'react';
import { connect } from 'react-redux';

import { Form } from 'react-final-form';
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

import { Tasks } from '@redux/task/types';
import { Measurements } from '@redux/measurements/types';
import { Suggestion } from '@redux/suggestion/types';
import { Filters } from '@redux/history/types';

type MapState = {
  tasks: Tasks;
  measurements: Measurements;
  suggestions: Suggestion;
  filters: Filters;
};

type Props = typeof mapDispatch & MapState;

const History: React.FC<Props> = ({
  tasks,
  measurements,
  suggestions,
  filters,
  getHistory,
  setStartDate,
  setEndDate,
  setKondor
}) => {
  const handleSubmit = async values => {
    console.log(values);
    //getHistory();
  };

  const getResults = tasks.map(({ id }) => (
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
                defaultValue={filters.kondor}
                onChange={(id: number | string) => setKondor(id)}
                label="ID кондора"
                type="number"
                step={1}
              />
              <div className="history__datepickers">
                <div className="history__datepicker">
                  От{' '}
                  <MyDatePicker
                    startDate={filters.startDate}
                    handleChange={(date: Date) =>
                      date < filters.endDate && setStartDate(date)
                    }
                  />
                </div>
                <div className="history__datepicker">
                  До{' '}
                  <MyDatePicker
                    startDate={filters.endDate}
                    handleChange={(date: Date) =>
                      date > filters.startDate && setEndDate(date)
                    }
                  />
                </div>
              </div>
              <AddressInputs form="history" suggestions={suggestions} />
              <div className="history__submit">
                <Button type="submit">Отправить</Button>
              </div>
            </form>
          )}
        />
      </div>
      <div className="history__results">{getResults}</div>
    </div>
  );
};

const mapState = ({
  history: { tasks, measurements, filters },
  suggestions
}: RootState) => ({
  tasks,
  measurements,
  filters,
  suggestions: suggestions.history
});

const mapDispatch = { getHistory, setStartDate, setEndDate, setKondor };

export default connect(
  mapState,
  mapDispatch
)(History);
