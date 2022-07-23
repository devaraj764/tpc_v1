const mongoose = require('mongoose');

const AluminiSchema = mongoose.Schema({
    idNo: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    mobilenumber: {
        type: String,
    },
    internships:{
        type: Array
    },
    projects:{
        type: Array
    },
    placementoffers:{
        type: Array
    },
    working:{
        type: Object,
        default: {
            role:{
                type: String,
                default: ''
            },
            company:{type: String, default: ''},
            bond:{type: Number, default: ''},
            package:{type: String, default: ''},
            joiningdate:{type: String, default: ''},
        }
    }
},
    { collection: 'alumini', timestamps: true });

module.exports = mongoose.model('Alumini', AluminiSchema);