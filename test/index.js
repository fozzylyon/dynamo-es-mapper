var assert = require('assert');
var mapper = require('../index');

var input = [{
  eventID: 'magic-number',
  eventName: 'INSERT',
  eventVersion: '1.0',
  eventSource: 'aw:dynamodb',
  awsRegion: 'region-name',
  dynamodb: {
    Keys: {
      _id: {
        S: 'TEST_ID'
      }
    },
    NewImage: {
      test: {
        S: 'stuff'
      }
    },
    SequenceNumber: '1234',
    SizeBytes: 12000,
    StreamViewType: 'NEW_IMAGE'
  },
  eventSourceARN: 'arn:aws:dynamodb:stuff'
}];

var expected = '{\"update\":\"TEST_ID\"}\n{\"doc\":{\"test\":\"stuff\"},\"doc_as_upsert\":true}\n';

var result = mapper(input);
assert.equal(result, expected);

console.log('Success.  Passed some really rigorous testing');
