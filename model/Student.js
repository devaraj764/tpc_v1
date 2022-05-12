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
    section: {
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
        type: Array,
        default: []
    },
    softSkills: {
        type: Array,
        default: []
    },
    schooling: {
        type: Object,
        default: {
            name: "",
            cgpa: "",
            loc: "",
            passout: "",
        }
    },
    preGraduation: {
        type: Object,
        default: {
            name: "",
            cgpa: "",
            loc: "",
            passout: "",
        }
    },
    graduation: {
        type: Object,
        default: {
            name: "",
            cgpa: "",
            passout: "",
            loc: "",
        }
    },
    links: {
        type: Array,
        default: []
    }
},
    { collection: 'students', timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);