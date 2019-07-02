const express = require('express');
const router = express.Router();
const TaskModel = require('../../../../models/mongoose/task');
const UserModel = require('../../../../models/mongoose/user');

module.exports = () =>{
    router.get('/:id', (req,res,next)=>{
        TaskModel.findById(req.params.id, function (err, task) {
            if (err) {
                console.log(err)
            } else {
                UserModel.find({}, function (err, users) {
                    if (err) {
                        console.log(err)
                    } else {
                        return res.render('updateTask', {
                            page : "Update",
                            task : task,
                            users : users
                        });
                    }
                });
                
            }
        });
    });
    router.post('/:id', async (req,res,next) => {
        const TaskID = req.params.id
        console.log('Day la ID' +req.params.id);
        const {name, taskDetail, member} = req.body;
        console.log(name);
        console.log(taskDetail);
        console.log(member);
        try {
            const taskUpdate = await TaskModel.findById(TaskID);
            if(!taskUpdate){
                res.status(404).json({ success: 0, message: "Not found!" })
            }else {
                for (key in {name, taskDetail, member }) {
                    if (taskUpdate[key] && req.body[key]) taskUpdate[key] = req.body[key];
                }
                let task_Update = taskUpdate.save();
                return res.redirect('/');
            }
        } catch (error) {
            console.log(error)
        }
    })

    return router;
}