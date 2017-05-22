const timer = require('../../lib/timer');

test('Convert seconds and nanoseconds in miliseconds', () => {

  const time = [
    1,       // seconds
    1000000, // nanoseconds -> 1 ms
  ];

  expect(1001).toBe(timer.convert2ms(time));
});
