const { response } = require('express');
const express = require('express');
const Student = require('../model/Student.js');
const router = express.Router();
const verify = require('./verify-token.js');
require('dotenv/config');
const jwt = require('jsonwebtoken');

router.get('/', verify, async (req, res) => {
    try {
        const posts = await Student.find();
        res.json(posts);
        console.log(posts)
    } catch (err) {
        response.json({ message: err });
    }
})

router.get('/:idNo', verify, async (req, res) => {

    try {
        const posts = await Student.findOne({ idNo: req.params.idNo });
        res.json(posts);
        console.log(posts)
    } catch (err) {
        response.json({ message: err });
    }

});

//update post
router.patch('/', verify, async (req, res) => {

    // get id from token
    const token = req.header('auth-token');
    const data =  jwt.verify(token, process.env.TOKEN_SECRET);

    try {
        const updatePost = await Student.updateOne({ idNo: data.idNo.toUpperCase() },
            { $set: { ...req.body } });
        res.json(updatePost)
    } catch (err) {
        res.json({ message: err })
    }
})

module.exports = router;