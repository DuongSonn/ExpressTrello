const express = require('express');
const router = express.Router();
const TaskModel = require('../../../models/mongoose/task');

module.exports = () =>{
    router.get('/', (req,res,next)=>{
        res.render('createTask',{
            page: 'Create Task'
        });
    });
    router.post('/', async (req,res,next) => {
        try {
            const {name, taskDetail ,member} = req.body;
            console.log(member);
            const userCreate = await TaskModel.create({name,taskDetail,member});
            console.log(userCreate);
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