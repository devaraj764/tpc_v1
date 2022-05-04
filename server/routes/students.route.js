const { response } = require('express');
const express = require('express');
const Student = require('../model/Student.js');
const router = express.Router();
const verify = require('./verify-token.js')

router.get('/',verify, async (req, res) => {
    try {
        const posts = await Student.find();
        res.json(posts);
        console.log(posts)
    } catch (err) {
        response.json({ message: err });
    }
})

router.get('/:idNo',verify, async (req, res) => {

    try {
        const posts = await Student.findOne({idNo: req.params.idNo});
        res.json(posts);
        console.log(posts)
    } catch (err) {
        response.json({ message: err });
    }

});

module.exports = router;