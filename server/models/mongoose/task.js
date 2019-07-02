const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = mongoose.Schema({
    name: {type: String, required: true },
    taskDetail: {type: String, required : true},
    member: {type: String, required: false}
    // member: [{type: Schema.Types.ObjectId, ref: "user" }]
}, { timestamps: true });

module.exports = mongoose.model('task',taskSchema);