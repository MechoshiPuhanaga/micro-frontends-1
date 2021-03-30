import 'core-js';
import 'zone.js/dist/zone';

if (process.env.ENV === 'production') {
} else {
  Error.stackTraceLimit = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}
