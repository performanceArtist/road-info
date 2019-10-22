import { EventEmitter } from 'events';

import newDiagnostic from './newDiagnostic';
import newMeasurement from './newMeasurement';

const postgresEmitter = (function() {
  const emitter = new EventEmitter();

  emitter.on('new_diagnostic', newDiagnostic);
  emitter.on('new_measurement', newMeasurement);

  return emitter;
})();

export default postgresEmitter;
