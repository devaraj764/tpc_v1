const mongoose = require('mongoose');

const NotificationSchema = mongoose.Schema({
    type: {
        type: String,
        enum: ['info', 'warning', 'success', 'test'],
        required: true
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    externals: { type: String }
},
    { collection: 'notifications', timestamps: true });

module.exports = mongoose.model('Notification', NotificationSchema);