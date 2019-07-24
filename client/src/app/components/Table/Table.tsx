import React, { useState } from 'react';
import Pagination from '@components/Pagination/Pagination';

import { ChartInfo } from '@redux/measurements/types';

type Props = {
  data: Array<{ [key: string]: string | number }>;
  chartInfo: ChartInfo;
  maxRows?: number;
};

const Table: React.FC<Props> = ({ data = [], maxRows = 10, chartInfo }) => {
  const [bounds, setBounds] = useState({ start: 0, finish: maxRows });

  if (data.length === 0) return null;

  const handleClick = (index: number) => {
    setBounds({ start: index * maxRows, finish: (index + 1) * maxRows });
  };

  const isValid = (
    breakpoint: { start: number; finish: number } | null = null,
    value: number
  ) =>
    breakpoint ? value > breakpoint.start && value < breakpoint.finish : true;

  const cells = (item: { [key: string]: number }) =>
    Object.keys(item).map(key => (
      <td
        className={
          isValid(
            chartInfo.lines[key] ? chartInfo.lines[key].breakpoint : null,
            item[key]
          )
            ? 'table__cell'
            : 'table__cell table__cell_invalid'
        }
      >
        {item[key]}
      </td>
    ));

  const titles = Object.keys(data[0]).map(key => (
    <th className="table__head-cell">
      {chartInfo.lines[key]
        ? chartInfo.lines[key].units
        : chartInfo.xAxis.units}
    </th>
  ));

  const rows = data
    .filter((item, index) => index >= bounds.start && index < bounds.finish)
    .map(item => <tr className="table__row">{cells(item)}</tr>);

  return (
    <>
      <table className="table">
        <thead>
          <tr className="table__row">{titles}</tr>
        </thead>

        <tbody>{rows}</tbody>
      </table>
      {data.length / maxRows > 1 && (
        <Pagination
          max={Math.ceil(data.length / maxRows)}
          onClick={handleClick}
        />
      )}
    </>
  );
};

export default Table;
