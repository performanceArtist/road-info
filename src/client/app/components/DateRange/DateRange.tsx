import * as React from 'react';

import DatePicker from '@components/DatePicker/DatePicker';

type Props = {
  startDate: Date;
  endDate: Date;
  onStartChange: (date: Date) => void;
  onEndChange: (date: Date) => void;
};

const DateRange: React.FC<Props> = ({
  startDate,
  endDate,
  onStartChange,
  onEndChange
}) => {
  return (
    <div className="date-range">
      <div className="date-range__datepicker">
        <DatePicker
          startDate={new Date(startDate)}
          handleChange={(date: Date) => {
            date < new Date(endDate) && onStartChange(date);
          }}
        />
      </div>
      <span className="date-range__delimiter">-</span>
      <div className="date-range__datepicker">
        <DatePicker
          startDate={new Date(endDate)}
          handleChange={(date: Date) =>
            date > new Date(startDate) && onEndChange(date)
          }
        />
      </div>
    </div>
  );
};

export default DateRange;
