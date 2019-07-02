const express = require('express');
const router = express.Router();
const checkState = require('../index');
const taskRouter = require('./task');
const updateRouter = require('./update');
const TaskModel = require('../../models/mongoose/task');
module.exports = () => {
    router.use('/createTask', taskRouter());
    router.use('/updateTask', updateRouter());
    router.get('/exit', (req, res, next) => {
        req.session.destroy(function(err) {
            return res.redirect('/');
        })
    })
    router.use((req, res, next) => {
        const userInfo = req.session.userInfo;
        if (userInfo && userInfo.state == 2) {
            next();
        } else {
            // Dang nhap cho state 1
            console.log("Login by : " + userInfo.name);
            TaskModel.find({'member' : userInfo.name}, function(err, tasks){
                if(err){
                    console.log(err);
                } else{
                    return res.render('main',{
                        user : userInfo.name,
                        tasks : tasks
                    })
                }
            });
        }
    });

    router.get('/', (req, res, next) => {
        
        // Dang nhap cho state 2

        // console.log(req.session);
        // console.log(req.session.cookie);
        // console.log(req.sessionID);
        const userInfo = req.session.userInfo;
        // console.log("Login by : " + userInfo.name);
        TaskModel.find({'member' : userInfo.name}, function(err, tasks){
            if(err){
                console.log(err);
            } else{
                return res.render('main2',{
                    user : userInfo.name,
                    tasks : tasks
                })
            }
        });
    });
    router.post('/', (req, res, next) => {
        try {
            res.send("Main");
        } catch (error) {
            
        }
    });
    
    return router;
}