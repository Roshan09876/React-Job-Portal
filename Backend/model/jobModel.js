const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Title is Required'],
        maxlength: 50
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'Description is Required']
    },
    salary: {
        type: String,
        trim: true,
        required: [true, 'Salary is Required']
    },
    location: {
        type: String,
    },
    availabe: {
        type: Boolean,
        default: true 
    },
    jobType: {
        type: ObjectId,
        ref: 'jobType',
        required: true
    },
    user: {                 //linking job Model to user Model
        type: ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Job = mongoose.model('job', jobSchema);
module.exports = Job;