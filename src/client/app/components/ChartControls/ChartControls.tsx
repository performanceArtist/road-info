import * as React from 'react';
import { connect } from 'react-redux';

import Button from '@shared/Button/Button';
import { Icon, IconImage } from '@components/Icon/Icon';

import { openModal } from '@redux/modal/actions';

type OwnProps = {
  onArrowClick: (event?: React.MouseEvent) => void;
};

type Props = typeof mapDispatch & OwnProps;

const ChartControls: React.FC<Props> = ({ onArrowClick, openModal }) => {
  return (
    <div className="chart-controls">
      <div className="chart-controls__title">Управление:</div>
      <Icon image={IconImage.BACK_ARROW} size="medium" onClick={onArrowClick} />
      <div className="chart-controls__input">
        <Button onClick={() => openModal('Chart', {})}>Настройки</Button>
      </div>
    </div>
  );
};

const mapDispatch = {
  openModal
};

export default connect(
  null,
  mapDispatch
)(ChartControls);
