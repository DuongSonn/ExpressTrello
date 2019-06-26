const moongoose = require('mongoose');

const taskSchema = moongoose.Schema({
    name: {type: String, required: true },
    taskDetail: {type: String, required : true},
    member: {type: String, required: false}
}, { timestamps: true });

module.exports = moongoose.model('task',taskSchema);