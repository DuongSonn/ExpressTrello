const express = require('express');
const router = express.Router();
const mainRouter = require('./main');
const signupRouter = require('./signup');

module.exports = () => {
    router.get('/', (req,res,next) => {
        return res.render('login', {
            page: 'Login',
        });
    });
    router.use('/main', mainRouter());
    router.use('/signup', signupRouter());
    return router;
}
