import { action } from 'typesafe-actions';

export const MODAL = {
  OPEN: 'MODAL.OPEN',
  CLOSE: 'MODAL.CLOSE'
};

export type OpenModal = {
  type: string;
  payload: { modalType: string; modalProps: any };
};

export function openModal(modalType: string, modalProps: any): OpenModal {
  return {
    type: MODAL.OPEN,
    payload: { modalType, modalProps }
  };
}

export function closeModal() {
  return {
    type: MODAL.CLOSE
  };
}
