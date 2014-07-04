# ornito-phili [![Build Status](https://secure.travis-ci.org/ornitorrinko/ornito-phili.png?branch=master)](http://travis-ci.org/ornitorrinko/ornito-phili)

> The tiny and lightweight dependency injection Spring like made by Ornitorrinko


## Getting Started

Install the module with: `npm install ornito-phili`

```js
var ornito-phili = require('ornito-phili');
ornito-phili.awesome(); // "awesome"
```

## Documentation

_(Coming soon)_


## Examples

var phili = require("ornito-phili");
var locator = new phili(__dirname + "/my-resources.json");
var myResource = locator.get("mainResource");

//Your object will be ready to use
myResource.proceed();

//my-resources.json
"resources": {
	"mainResource": {
		"path": "path/to/your-resource/resource.js"
	}
	...
}
, "definitions":{
	"mainResource":{
		"dependencies": ["db", "otherResource", ...]
	}
	...

## Contributing
For now this library is in total development only ornito members are allowed to contribute

## License

Copyright (c) 2014 Vinicius Mesquita  
Licensed under the MIT license.