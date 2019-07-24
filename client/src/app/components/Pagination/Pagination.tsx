import React from 'react';

type Props = {
  max: number;
  onClick: (index: number) => void;
};

const Pagination: React.FC<Props> = ({ max, onClick }) => {
  const items = [...Array(max)].map((el, index) => (
    <div className="pagination__item" onClick={() => onClick(index)}>
      {index}
    </div>
  ));

  return <div className="pagination">{items}</div>;
};

export default Pagination;
