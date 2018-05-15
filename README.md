# dynamo-es-mapper

Maps dynamodb stream records into actions ready for the elasticsearch bulk API

## Usage
`npm install`

```javascript
var dynes = require('dynamo-es-mapper');

var esActions = dynes(dynamoRecords, 'custom_id');

...
```
**Options**
*  `api`: *index, update ( default ) - ES bulk api type*
```javascript
var options = {
    api: 'index' //defaults to 'update'
};
var esActions = dynes(dynamoRecords, 'id', options);
```