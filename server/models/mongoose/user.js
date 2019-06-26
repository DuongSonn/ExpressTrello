const moongoose = require('mongoose');

const userSchema = moongoose.Schema({
    name: {type: String, required: true },
    password: {type: String, required: true},    
    email: {type: String, required: true, unique:true},
    phone: {type: String, required: true},
    state: {type: String, required: true}
}, { timestamps: true });

module.exports = moongoose.model('user',userSchema);