import * as React from 'react';
import { useState } from 'react';

import Pagination from './Pagination';

import { ChartInfo } from '@shared/types';

type Alias = {
  [key: string]: Array<string>;
};

type Props = {
  data: Array<{ [key: string]: number }>;
  chartInfo: ChartInfo;
  alias?: Alias;
  maxRows?: number;
};

const Table: React.FC<Props> = ({
  data = [],
  chartInfo,
  maxRows = 10,
  alias = {}
}) => {
  const [bounds, setBounds] = useState({ start: 0, finish: maxRows });

  if (data.length === 0) return null;

  const handlePaginationClick = (index: number) => {
    setBounds({ start: index * maxRows, finish: (index + 1) * maxRows });
  };

  const resolveAlias = (key: string) => {
    if (chartInfo.lines.hasOwnProperty(key)) return key;

    return Object.keys(alias).reduce((acc, cur) => {
      if (alias[cur].indexOf(key) !== -1) return cur;
      return acc;
    }, '');
  };

  const isValid = (
    breakpoint: { start: number; finish: number } | null,
    value: number
  ) => {
    if (!value) return true;
    return breakpoint
      ? value > breakpoint.start && value < breakpoint.finish
      : true;
  };
  const cells = (item: { [key: string]: number }) =>
    Object.keys(item).map(rawKey => {
      const key = resolveAlias(rawKey);

      return (
        <td
          className={
            isValid(
              chartInfo.lines[key] ? chartInfo.lines[key].breakpoint : null,
              item[rawKey]
            )
              ? 'table__cell'
              : 'table__cell table__cell_invalid'
          }
        >
          {item[rawKey]}
        </td>
      );
    });

  const titles = Object.keys(data[0]).map(rawKey => {
    const key = resolveAlias(rawKey);

    return (
      <th className="table__head-cell">
        {chartInfo.lines[key]
          ? `${chartInfo.lines[key].name}, ${chartInfo.lines[key].units}`
          : `${chartInfo.xAxis.name}, ${chartInfo.xAxis.units}`}
      </th>
    );
  });

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
          onClick={handlePaginationClick}
        />
      )}
    </>
  );
};

export default Table;
