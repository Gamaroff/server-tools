server-tools [![Build Status](https://travis-ci.org/Gamaroff/server-tools.svg?branch=master)]
=======

This is a library with common stuff. 

## Install

```bash
$ npm install server-tools
```

## Usage

```js
var repository = require('server-tools').mongo_repository;
var model = require('server-tools').mongo_model;
var promises = require('server-tools').promises;
var promise = require('server-tools').promise;
var logger = require('server-tools').logger;
var mailer = require('server-tools').mailer;
var blob = require('server-tools').blob_storage;
var rabbit = require('server-tools').rabbit;
var sockets = require('server-tools').sockets;

```

## License 

(The MIT License)

Copyright (c) 2013 gamaroff &lt;lorien@gamaroff.org&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
