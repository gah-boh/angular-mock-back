var express = require('express');

var app = express();
var port = 9000;

app.use(express.static(__dirname));

app.get('/serverResponse', function(req, res) {
    res.send('response from server');
});

app.listen(port);

console.log('listening on port: ', port);

