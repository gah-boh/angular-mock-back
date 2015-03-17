# Angular Mock Back
A utility library to help with mocking your backend and backend-less development.

## Installation
You can install this module with bower

```
bower install angular-mock-back
```

## Sample Project
Look at [angular-mock-back-demo-app](https://github.com/gah-boh/angular-mock-back-demo-app) for examples.

## Overview
For a quick overview checkout the [ngEurope Lightning Talk](https://www.youtube.com/watch?v=E5pkE8qFCz0).

## Documentation
Create a config object with the two following properties:

```
moduleName: <String>
mappings: <Array>
```

Once you have your config object: `angularMockBack(configObject);`

### Config Object

#### Module Name Property
Is the name of the top-level module of your application.
```
moduleName: 'myApp'
```

#### Mappings
This is where you define what data is going to be returned. The mappings is an array of objects that have `body` for the return object and `code` for the returned status code plus it can have the same properties as [$httpBackend.when()](https://docs.angularjs.org/api/ngMockE2E/service/$httpBackend). 

```
mappings: [
	{
		url: <string> | <regex>,
		body: <data to be returned>,
		data: <string> | <regex>,
		headers: <object> | <function(object)>,
        passThrough: <boolean>
	}
]
```


It defaults to a method of `GET` and status of `200` so you can write:

```
mappings: [
	{
		url: <string or regex>,
		body: <data to be returned>
	}
]
```
Additional to all the properties from `$httpBackend.when` there is also a `passThrough` property. Setting it to `true` allows for the request to go to the server. It's very useful in overrides.

#### Overrides
You can override any part of the mapping. To do this you add an `overrides` property to the mapping. 
You can add as many overrides as you want to a mapping. To use the override just add the name of the override as a query parameter to the url right after the index file.

```
mappings: [
	{
		url: <string or regex>,
		body: <data to be returned>,
		overrides: {
			overrideName: {
				body: <data to be overriden>
			}
		}
	}
]
```
The url with the override would look something like:

`localhost:9000?overrideName`

or

`localhost:9000/index-mb.html?overrideName`

Multiple overrides can be used:

`localhost:9000/index-mb.html?overrideName&secondOverride`

