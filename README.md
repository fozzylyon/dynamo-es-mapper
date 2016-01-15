# dynamo-es-mapper

Maps dynamodb stream records into actions ready for the elasticsearch bulk API

## Usage
`npm install`

```javascript
var dynes = require('dynamo-es-mapper');

var esActions = dynes(dynamoRecords, 'custom_id');

...
```