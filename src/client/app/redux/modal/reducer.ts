import { MODAL } from './actions';

import TestModal from '@components/TestModal/TestModal';
import InfoModal from '@components/InfoModal/InfoModal';
import MaterialModal from '@components/MaterialModal/MaterialModal';
import TaskModal from '@components/TaskModal/TaskModal';
import KondorModal from '@components/KondorModal/KondorModal';
import GenerationModal from '@components/GenerationModal/GenerationModal';
import TaskHistoryModal from '@components/TaskHistoryModal/TaskHistoryModal';
import PathModal from '@components/PathModal/PathModal';

import { ConnectedComponentClass } from 'react-redux';

export const ModalMap: Record<
  string,
  ConnectedComponentClass<any, any> | React.SFC | React.Component
> = {
  Test: TestModal,
  Info: InfoModal,
  Material: MaterialModal,
  Task: TaskModal,
  Kondor: KondorModal,
  Generation: GenerationModal,
  TaskHistory: TaskHistoryModal,
  Path: PathModal
};

export interface ModalPayload {
  modalType: string;
  modalProps: any;
}

interface ModalAction {
  type: string;
  payload: ModalPayload;
}

const initialState: Array<ModalPayload> = [];

export default function modalReducer(
  state = initialState,
  { type, payload }: ModalAction
) {
  switch (type) {
    case MODAL.OPEN:
      return state.concat(payload);
    case MODAL.CLOSE:
      return state.slice(0, -1);
    default:
      return state;
  }
}
