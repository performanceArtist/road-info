import * as React from 'react';

type Info = {
  title: string;
  value: string | number;
};

type Props = {
  status: 'ready' | 'taken' | 'done';
  kondor: null | string;
  items: Array<Info>;
};

const MeasurementInfo: React.FC<Props> = ({ items, kondor, status }) => {
  const getStatus = (status: 'ready' | 'taken' | 'done') => {
    switch (status) {
      case 'ready':
        return 'Ожидает выполнения';
      case 'taken':
        return `Выполняется кондором #${kondor}`;
      case 'done':
        return `Выполнено кондором #${kondor}`;
      default:
        return 'Статус неизвестен';
    }
  };

  const info = items.map(({ title, value }) => (
    <div className="measurement-info__item" key={title}>
      <div className="measurement-info__title">{`${title}:`}</div>
      <div className="measurement-info__info">{value}</div>
    </div>
  ));

  return (
    <div className="measurement-info">
      <div className="measurement-info__status">
        Статус: {getStatus(status)}
      </div>
      <div className="measurement-info__container">{info}</div>
    </div>
  );
};

export default MeasurementInfo;
