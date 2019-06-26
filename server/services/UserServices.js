const UserModel = require('../models/mongoose/user');

async function getOne(email) {
    return UserModel.findOne({ 'email': email });
}
module.exports = {
    getOne
};