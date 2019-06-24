const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes');

//pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));
//routes
app.use('/',routes());

//khoi tao server
app.listen(3000);
module.exports = app;