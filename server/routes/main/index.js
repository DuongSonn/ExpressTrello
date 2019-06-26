const express = require('express');
const router = express.Router();
const checkState = require('../index');
const taskRouter = require('./task');

module.exports = () => {
    router.use('/CreateTask', taskRouter());
    router.use((req,res,next) => {
        const userInfo = req.session.userInfo;
        if (userInfo && userInfo.state==2) {
            next();
        } else {
            res.send('Khong phai admin');
        }
    });
    router.get('/', (req,res,next) => {
        console.log(req.session);
        console.log(req.session.cookie);
        console.log(req.sessionID);
        return res.send('Day la admin');
    });
    return router;
}