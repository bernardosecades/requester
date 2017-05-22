const MessageIn = require('../../lib/message-in');

test('Transform headers array to json', () => {
    const arrayInput = ["Pragma:no-cache"];

    expect(MessageIn.prototype.headersArrayToJson(arrayInput)).toEqual({
       'Pragma' : "no-cache"
    });
});