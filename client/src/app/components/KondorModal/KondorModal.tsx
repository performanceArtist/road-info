import React from 'react';
import { connect } from 'react-redux';

import Modal from '@components/Modal/Modal';
import { closeModal } from '@redux/modal/actions';

type OwnProps = {
  id: string;
  coordinates: { x: number; y: number };
};
type Props = OwnProps & typeof mapDispatch;

class KondorModal extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { id, coordinates, closeModal } = this.props;

    return (
      <Modal open={true} onClose={closeModal}>
        <Modal.Header>Kondor #{id}</Modal.Header>
        <Modal.Content>
          Ok
          <Modal.Footer />
        </Modal.Content>
      </Modal>
    );
  }
}

const mapDispatch = { closeModal };

export default connect(
  null,
  mapDispatch
)(KondorModal);
