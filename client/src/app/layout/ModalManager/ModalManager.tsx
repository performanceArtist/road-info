import React from 'react';
import { connect } from 'react-redux';

import { ModalMap, ModalPayload } from '@redux/modal/reducer';

const ModalManager = ({ modals }: { modals: Array<ModalPayload> }) => {
  const renderedModals = modals.map(
    (modalDescription: ModalPayload, index: number) => {
      const { modalType, Props = {} } = modalDescription;
      const ModalComponent = ModalMap[modalType];

      return <ModalComponent {...Props} key={modalType + index} />;
    }
  );

  return <>{renderedModals}</>;
};

const mapStateToProps = (state: { modals: Array<ModalPayload> }) => ({
  modals: state.modals
});

export default connect(mapStateToProps)(ModalManager);
