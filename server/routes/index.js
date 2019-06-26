const express = require('express');
const router = express.Router();
const mainRouter = require('./main');
const signupRouter = require('./signup');
const UserService = require('../services/UserServices');

module.exports = () => {
    router.use('/main', mainRouter());
    router.use('/signup', signupRouter());
    router.use((req,res,next) => {
        if(!req.session.userInfo) {
            next();
        } else {
            return res.redirect('/main');
        }
    });
    router.get('/', (req,res,next) => {
        return res.render('login', {
            page: 'Login',
        });
    });
    router.post('/', async (req,res,next) => {
        try {
            if (req.body.email){
                console.log(req.body);
                var user = await UserService.getOne(req.body.email);     
                if (!user) {
                    return res.send('dang nhap that bai');
                }
                if(user.password == req.body.password) {
                    req.session.userInfo = {
                        id: user._id,
                        name : user.name,
                        email : user.email,
                        state : user.state
                    }                     
                    return res.redirect('/main');                   
                } else {
                    return res.send('dang nhap that bai');
                }
            }
        } catch (err) {
            res.send(err);
        }
    });    
    return router;
};

