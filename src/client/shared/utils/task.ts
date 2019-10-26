import { TaskStatus } from '../types';

export function getStatus(status: TaskStatus) {
  switch (status) {
    case 'done':
      return 'Выполнено';
    case 'ready':
      return 'Ожидает выполнения';
    case 'taken':
      return 'Выполняется';
    case 'cancelled':
      return 'Отменено';
    default:
      return 'Неизвестно';
  }
}
