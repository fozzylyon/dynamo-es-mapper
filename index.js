'use strict';

var marshaler = require('dynamodb-marshaler').toJS;

var _defaultKey = '_id';

var _types = {
  INSERT: 'INSERT',
  MODIFY: 'MODIFY',
  REMOVE: 'REMOVE'
};

module.exports = function(records, key) {
  key = key || _defaultKey;

  var actions = [];
  records.forEach(function(rec) {
    if (rec.eventName === _types.REMOVE) {
      actions.push(JSON.stringify({ delete: { _id: rec.dynamodb.Keys[key].S } }));
    }
    else {
      actions.push(JSON.stringify({ update: { _id: rec.dynamodb.Keys[key].S} }));
      actions.push(JSON.stringify({ doc: marshaler(rec.dynamodb.NewImage), doc_as_upsert: true }));
    }
  });
  return actions.join('\n') + '\n';
};