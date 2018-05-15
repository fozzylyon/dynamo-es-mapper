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
      },
      moreStuff: {
        S: 'more stuff'
      }
    },
    SequenceNumber: '1234',
    SizeBytes: 12000,
    StreamViewType: 'NEW_IMAGE'
  },
  eventSourceARN: 'arn:aws:dynamodb:stuff'
}, {
    eventID: 'magic-number',
    eventName: 'MODIFY',
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

var expected1 = '{\"update\":{\"_id\":\"TEST_ID\"}}\n{\"doc\":{\"test\":\"stuff\",\"moreStuff\":\"more stuff\"},\"doc_as_upsert\":true}\n{\"update\":{\"_id\":\"TEST_ID\"}}\n{\"doc\":{\"test\":\"stuff\"},\"doc_as_upsert\":true}\n';

var result1 = mapper(input);

assert.equal(result1, expected1);

console.log('Successful test on es update api!!');

var expected2 = '{\"index\":{\"_id\":\"TEST_ID\"}}\n{\"test\":\"stuff\",\"moreStuff\":\"more stuff\"}\n{\"index\":{\"_id\":\"TEST_ID\"}}\n{\"test\":\"stuff\"}\n';

var result2 = mapper(input, '_id', { api: 'index' });

assert.equal(result2, expected2);

console.log('Successful test on es index api!!!');