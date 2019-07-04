import React from 'react';
import { connect } from 'react-redux';

import { ModalMap, ModalPayload } from '@redux/modal/reducer';

const mapStateToProps = state => ({ currentModals: state.modals });

const ModalManager = ({
  currentModals
}: {
  currentModals: Array<ModalPayload>;
}) => {
  const renderedModals = currentModals.map(
    (modalDescription: ModalPayload, index: number) => {
      const { modalType, modalProps = {} } = modalDescription;
      const ModalComponent = ModalMap[modalType];

      return <ModalComponent {...modalProps} key={modalType + index} />;
    }
  );

  return <>{renderedModals}</>;
};

export default connect(mapStateToProps)(ModalManager);
