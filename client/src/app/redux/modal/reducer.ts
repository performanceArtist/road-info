import { MODAL } from './actions';

import TestModal from '../../components/TestModal/TestModal';
import InfoModal from '../../components/InfoModal/InfoModal';
import MaterialModal from '../../components/MaterialModal/MaterialModal';
import SetupModal from '../../components/SetupModal/SetupModal';
import NormModal from '../../components/NormModal/NormModal';

import { ConnectedComponentClass } from 'react-redux';

export const ModalMap: Record<
  string,
  ConnectedComponentClass<any, any> | React.SFC | React.Component
> = {
  Test: TestModal,
  Info: InfoModal,
  Material: MaterialModal,
  Setup: SetupModal,
  Norm: NormModal
};

export interface ModalPayload {
  modalType: string;
  modalProps: any;
}

const initialState: Array<ModalPayload> = [];

function openModal(state: Array<ModalPayload>, payload: any) {
  const { modalType, modalProps } = payload;
  return state.concat({ modalType, modalProps });
}

function closeModal(state: Array<ModalPayload>) {
  const newState = state.slice();
  newState.pop();
  return newState;
}

interface ModalAction {
  type: string;
  payload: ModalPayload;
}

export default function modalReducer(
  state = initialState,
  { type, payload }: ModalAction
) {
  switch (type) {
    case MODAL.OPEN:
      return openModal(state, payload);
    case MODAL.CLOSE:
      return closeModal(state);
    default:
      return state;
  }
}
