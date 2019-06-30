export const MODAL = {
  OPEN: 'MODAL.OPEN',
  CLOSE: 'MODAL.CLOSE'
};

export function openModal(modalType: string, modalProps: any) {
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
