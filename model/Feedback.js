const mongoose = require('mongoose');

const FeedbackSchema = mongoose.Schema({
    idNo: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
},
    { collection: 'feedbacks', timestamps: true });

module.exports = mongoose.model('Feedback', FeedbackSchema);