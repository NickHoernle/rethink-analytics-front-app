var express = require('express');
var app = express();
var compression = require('compression');

var twoHours = 7200000;

app.use(compression());

app.use(express.static('./dist', { maxAge: twoHours }));

app.listen(process.env.PORT || 80);
