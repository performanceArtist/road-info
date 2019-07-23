import React from 'react';
import { connect } from 'react-redux';

import { Field, Form } from 'react-final-form';

import { Icon, IconImage } from '@components/Icon/Icon';

import Button from '@shared/Button/Button';
import FinalInput from '@shared/FinalInput/FinalInput';
import Dropdown from '@components/Dropdown/Dropdown';

import { saveChartSettings } from '@redux/measurements/actions';
import { openModal } from '@redux/modal/actions';
import { RootState } from '@redux/reducer';

type OwnProps = {
  onArrowClick: (event?: React.MouseEvent) => void;
};

type Props = typeof mapState & typeof mapDispatch & OwnProps;

const ChartControls: React.FC<Props> = ({
  chartInfo,
  saveChartSettings,
  onArrowClick,
  openModal
}) => {
  const onSubmit = (formData: any) => {
    console.log(formData);
  };

  return (
    <div className="chart-controls">
      <div className="chart-controls__title">Управление:</div>
      <Icon image={IconImage.BACK_ARROW} size="medium" onClick={onArrowClick} />
      <div className="chart-controls__input">
        <Button onClick={() => openModal('Chart', {})}>Настройки</Button>
      </div>
      {/*
      <div className="chart-controls__title">Настройки:</div>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="chart-controls__form">
            <div className="chart-controls__input">
              <FinalInput
                label="Макс. точек"
                name="maxTicks"
                defaultValue={chartInfo.maxTicks}
                type="number"
                component="input"
              />
            </div>
            <div className="chart-controls__input">
              <Dropdown
                name="line"
                defaultValue="density"
                options={[
                  { name: 'Плотность', value: 'density' },
                  { name: 'Колейность', value: 'rutting' },
                  { name: 'IRI', value: 'iri' },
                  { name: 'Толщина', value: 'thickness' }
                ]}
              />
            </div>
            <div className="chart-controls__input">
              <FinalInput
                label="Минимум"
                name="min"
                type="number"
                component="input"
              />
            </div>
            <div className="chart-controls__input">
              <FinalInput
                label="Максимум"
                name="max"
                type="number"
                component="input"
              />
            </div>
            <div className="chart-controls__input">
              <Button type="submit">Сохранить</Button>
            </div>
          </form>
        )}
              />*/}
    </div>
  );
};

const mapState = ({ measurements }: RootState) => ({
  chartInfo: measurements.chartInfo
});

const mapDispatch = {
  saveChartSettings,
  openModal
};

export default connect(
  mapState,
  mapDispatch
)(ChartControls);
