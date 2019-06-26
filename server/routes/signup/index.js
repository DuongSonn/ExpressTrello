const express = require('express');
const router = express.Router();
const UserModel = require('../../models/mongoose/user');

module.exports = () => {
    router.get('/', (req,res,next) => {
        return res.render('signup',{
            page: 'Sign up',
        });
    });
    router.post('/', async (req,res,next) => {
        try {
            const {name, password, email ,phone, state} = req.body;
            const userCreate = await UserModel.create({name, password,email,phone,state});
            if (userCreate) {
                return res.redirect('/');
            } else {
                return res.send('Tao tk that bai');
            }
        } catch (error) {
            console.log(error)
        }
    })
    return router;
}