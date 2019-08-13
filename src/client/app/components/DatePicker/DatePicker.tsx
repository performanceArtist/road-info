import * as React from 'react';
import DatePicker from 'react-datepicker';

type Props = {
  handleChange: (date: Date) => void;
  startDate?: Date;
};

const MyDatePicker: React.FC<Props> = ({
  handleChange,
  startDate = new Date()
}) => {
  console.log(startDate);
  return <DatePicker selected={startDate} onChange={handleChange} />;
};

export default MyDatePicker;
