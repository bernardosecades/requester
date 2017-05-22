const statsLogger = require('../../lib/stats-logger');

test('Full Prefix Stats Logs', () => {
  expect('requester_test.lololo.lalala').toBe(statsLogger.getFullKey('lololo.lalala'));
});
