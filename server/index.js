const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes');
const configs = require('./configs');
const moongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookie = require('cookie-parser');

moongoose.connect(configs.mongodb.dsn)
    .then (() => {
        console.log(`Successfully connected to MongoDB`);
    });

//session 
app.use(session({
    secret : "123abnkakshi",
    resave : false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 7 * 24 * 60 * 60 * 1000 // luu cookie 7 ngay
    }
}));

//parse application
// body-parser viet theo json
app.use(bodyParser.json());
// bat buoc co de su dung 
app.use(bodyParser.urlencoded({ extended: false }));

//pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));
//routes
app.use('/',routes());

//khoi tao server
app.listen(3000);
module.exports = app;