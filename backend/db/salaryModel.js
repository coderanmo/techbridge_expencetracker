const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        default: null
    },
    salary: {
        type: Number,
        required: [true, 'Salary is required']
    }
}, { timestamps: true }); 

const salaryModel = mongoose.model('salary', salarySchema);

module.exports = { salaryModel };
