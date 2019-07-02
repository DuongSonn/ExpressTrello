const express = require('express');
const router = express.Router();
const TaskModel = require('../../../models/mongoose/task');
const UserModel = require('../../../models/mongoose/user');
const updatedetailRouter = require('./updateDetail/index');
module.exports = () =>{
    router.use('/detail', updatedetailRouter());
    router.get('/', (req,res,next)=>{
        const userInfo = req.session.userInfo;
        TaskModel.find({}, function (err, tasks) {
            if (err) {
                console.log(err)
            } else {
                res.render('listTask', {
                    user : userInfo.name,
                    tasks : tasks
                });
            }
        });
    });
    router.post('/', async (req,res,next) => {
        try {
            const {name} = req.body; 
            console.log("Name task : "+ name);
            await TaskModel.find({'name': name}, function(err , task,){
                console.log(task);
                res.render('updateTask.pug',{
                    page : 'Giao Task',
                    task : task
                });
            });
            if (userCreate) {
                return res.redirect('/');
            } else {
                return res.send('Tao task that bai');
            }
        } catch (error) {
            console.log(error)
        }
    });
    return router;
}