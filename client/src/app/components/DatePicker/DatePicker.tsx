import React from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

type Props = {
  handleChange: (date: Date) => void;
  startDate?: Date;
};

const MyDatePicker: React.FC<Props> = ({
  handleChange,
  startDate = new Date()
}) => <DatePicker selected={startDate} onChange={handleChange} />;

export default MyDatePicker;
