import { EventEmitter } from 'events';

import notifyOrderUpdate from './notifyOrderUpdate';
import newMeasurement from './newMeasurement';
import newOrder from './newOrder';

const postgresEmitter = (function() {
  const emitter = new EventEmitter();

  emitter.on('new_order', newOrder);
  emitter.on('order_update', notifyOrderUpdate);
  emitter.on('new_measurement', newMeasurement);

  return emitter;
})();

export default postgresEmitter;
