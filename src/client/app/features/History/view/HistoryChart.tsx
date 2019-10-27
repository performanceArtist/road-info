import * as React from 'react';
import * as R from 'ramda';
import { useState } from 'react';

import Chart from '@components/Chart/Chart';
import Table from '@components/Table/Table';
import Spinner from '@components/Spinner/Spinner';
import {
  MeasurementData,
  MeasurementItem
} from '@root/client/app/redux/data/types';
import { ChartInfo } from '@shared/types';
import { ChartFooter } from '@features/CompositeChart';

type OwnProps = {
  measurements: MeasurementItem;
  chartInfo: ChartInfo;
  fetching: boolean;
};

type Props = OwnProps;

const HistoryChart: React.FC<Props> = ({
  measurements: { taskId, data },
  chartInfo,
  fetching
}) => {
  const [tables, setTables] = useState([]);
  const [bigPreviews, setBigPreviews] = useState([]);

  const keys = ['iri', 'rutting', 'thickness', 'density', 'distance'];
  const dataKeys = Object.keys(data);
  const all = keys.reduce((acc, cur) => {
    acc[cur] = [...Array(dataKeys.length)].map(() => []);
    return acc;
  }, {});

  dataKeys.forEach((instance, index) => {
    data[instance].forEach(measurement => {
      keys.forEach(key => {
        all[key][index].push({ [key]: measurement[key] });
      });
    });
  });

  const getPreview = (keyY: string, data: Array<MeasurementData>) => (
    <div className="chart-preview__chart" key={Math.random()}>
      <Chart
        modifier={bigPreviews.indexOf(keyY) !== -1 ? 'big-preview' : 'preview'}
        keyX={chartInfo.xAxis.key}
        keyY={keyY}
        data={data}
        showMax={false}
        showMin={false}
        showY={false}
        showBrush={false}
        enableZoom={false}
        {...chartInfo.lines[keyY]}
        maxTicks={1000}
      />
    </div>
  );

  const getChart = (key: string) =>
    all[key].map((group, index) => {
      const data = group.map((value, valIndex) => ({
        ...value,
        ...all.distance[index][valIndex]
      }));
      return getPreview(key, data);
    });

  const toggleExpand = (key: string) => {
    if (bigPreviews.indexOf(key) !== -1) {
      setBigPreviews(bigPreviews.filter(listKey => listKey !== key));
    } else {
      setBigPreviews(bigPreviews.concat(key));
    }
  };

  const getTable = (key: string) => {
    const distance = R.reduce(
      (acc, cur) => (cur.length > acc.length ? cur : acc),
      [],
      all.distance
    );

    const data = [];

    for (let i = 0; i < distance.length; i += 1) {
      const keyData = all[key].reduce((acc, cur, index) => {
        acc[`${key}-${index}`] = cur[i] ? cur[i][key] : '';
        return acc;
      }, {});
      data.push({ ...keyData, ...distance[i] });
    }

    const aliasKeys = [...Array(all[key].length)].map(
      (el, index) => `${key}-${index}`
    );
    const alias = {
      [key]: aliasKeys
    };

    return (
      <div className="composite-chart__table">
        <Table data={data} chartInfo={chartInfo} alias={alias} maxRows={15} />
      </div>
    );
  };

  const elements = ['iri', 'rutting', 'thickness', 'density'].map(key => (
    <div className="history-chart__chart">
      {tables.indexOf(key) === -1 ? getChart(key) : getTable(key)}
      <div className="history-chart__chart-footer">
        <ChartFooter
          type={tables.indexOf(key) !== -1 ? 'table' : 'preview'}
          onGraphIconClick={() =>
            setTables(tables.filter(listKey => listKey !== key))
          }
          onTableIconClick={() => setTables(tables.concat(key))}
          onHorExpandClick={() => toggleExpand(key)}
        />
      </div>
    </div>
  ));

  return (
    <div className="history-chart">
      <div className="history-chart__wrapper">
        {fetching ? <Spinner /> : elements}
      </div>
    </div>
  );
};

export default HistoryChart;
