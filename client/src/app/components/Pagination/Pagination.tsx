import React, { useState } from 'react';

type Props = {
  max: number;
  onClick: (index: number) => void;
};

const Pagination: React.FC<Props> = ({ max, onClick }) => {
  const [current, setCurrent] = useState(0);

  const items = [...Array(max)].map((el, index) => (
    <div
      className={
        index === current
          ? 'pagination__item pagination__item_selected'
          : 'pagination__item'
      }
      onClick={() => {
        setCurrent(index);
        onClick(index);
      }}
    >
      {index}
    </div>
  ));

  return <div className="pagination">{items}</div>;
};

export default Pagination;
