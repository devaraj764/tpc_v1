const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    idNo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    batch: {
        type: Number,
        required: true
    },
    yearofStudy: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    hardSkills: {
        type: [{
            name: { type: String },
            level: { type: Number },
            category: { type: String }
        }],
        default: []
    },
    softSkills: {
        type: [{
            name: { type: String },
            level: { type: Number },
            category: { type: String }
        }],
        default: []
    },
    schooling: {
        type: Object,
        default: {
            name: { type: String },
            cgpa: { type: mongoose.Types.Decimal128 },
            loc: { type: String }
        }
    },
    preGraduation: {
        type: Object,
        default: {
            name: { type: String },
            cgpa: { type: mongoose.Types.Decimal128 },
            loc: { type: String }
        }
    },
    collage: {
        type: Object,
        default: {
            name: { type: String },
            cgpa: { type: mongoose.Types.Decimal128 },
            loc: { type: String },
            yearofStudy: { type: Number }
        }
    }
},
    { collection: 'students', createdAt: new Date(), updatedAt: new Date() });

module.exports = mongoose.model('Student', StudentSchema);