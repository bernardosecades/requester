const compress = require('../../lib/compress');
const fs = require('fs');

const bookingResponseRaw = fs.readFileSync(process.cwd() + '/tests/lib/response', 'utf-8')
const responseRaw = JSON.stringify({
    'response': bookingResponseRaw,
    'context': 'whatever thing'
});
const responseCompressed = compress.compress(responseRaw)

test('Uncompress same response Booking', () => {
  expect(responseRaw).toBe(compress.uncompress(responseCompressed).toString())
});

test('Less string length compressed', () => {
  expect(Buffer.byteLength(responseCompressed,'utf8')).toBeLessThan(Buffer.byteLength(responseRaw), 'utf8')
});
