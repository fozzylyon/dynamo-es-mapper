'use strict';

var AWS = require("aws-sdk");

var docClient = new AWS.DynamoDB.DocumentClient();

//Create a Translator object, which comes from the DocumentClient
var dynamodbTranslator = docClient.getTranslator();

//It needs a SDK 'shape'. The individual Items in the Stream record
//are themselves the same Item shape as we see in a getItem response
var ItemShape = docClient.service.api.operations.getItem.output.members.Item;

var _defaultKey = '_id';

var _types = {
  INSERT: 'INSERT',
  MODIFY: 'MODIFY',
  REMOVE: 'REMOVE'
};

module.exports = function(records, key, options) {
    key = key || _defaultKey;

    options = options || {};

    var actions = [];
    records.forEach(function(rec) {
        if (rec.eventName === _types.REMOVE) {
            actions.push(JSON.stringify({ delete: { _id: rec.dynamodb.Keys[key].S } }));
        }
        else {
            if( options.api === 'index' ) {
                actions.push(JSON.stringify({ index: { _id: rec.dynamodb.Keys[key].S} }));
                actions.push(JSON.stringify(dynamodbTranslator.translateOutput(rec.dynamodb.NewImage, ItemShape)));
            }
            else {
                actions.push(JSON.stringify({ update: { _id: rec.dynamodb.Keys[key].S} }));
                actions.push(JSON.stringify({ doc: dynamodbTranslator.translateOutput(rec.dynamodb.NewImage, ItemShape), doc_as_upsert: true }));
            }
        }
    });
    return actions.join('\n') + '\n';
};