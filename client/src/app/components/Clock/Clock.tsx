import React, { useState, useEffect } from 'react';

const useInterval = (ms: number) => {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), ms);

    return () => clearInterval(timer);
  });

  return date;
};

const Clock: React.FC = () => {
  const date = useInterval(1000);

  const addZeros = (value: number) => `0${value}`.slice(-2);

  const getDate = () => {
    const day = addZeros(date.getUTCDate());
    const month = addZeros(date.getUTCMonth());
    const year = date.getUTCFullYear();

    return `${day}.${month}.${year}`;
  };

  const getDay = () => {
    const hours = addZeros(date.getUTCHours());
    const minutes = addZeros(date.getUTCMinutes());
    const seconds = addZeros(date.getUTCSeconds());

    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="clock">
      <div className="clock__wrapper">
        <span className="clock__title">UTC</span>
        <span className="clock__date">{getDate()}</span>
        <span className="clock__day">{getDay()}</span>
      </div>
    </div>
  );
};

export default Clock;
