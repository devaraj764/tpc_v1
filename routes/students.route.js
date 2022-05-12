const { response } = require('express');
const express = require('express');
const Student = require('../model/Student.js');
const Notification = require('../model/Notification.js');
const Feedback = require('../model/Feedback.js');
const router = express.Router();
const verify = require('./verify-token.js');
require('dotenv/config');

router.get('/', verify, async (req, res) => {
    try {
        const posts = await Student.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

router.get('/mydata', verify, async (req, res) => {
    try {
        const posts = await Student.findOne({ idNo: req.userid });
        res.status(200).json(posts);
    } catch (err) {
        res.status(400).json({ message: err });
    }

});

//update post
router.patch('/', verify, async (req, res) => {

    try {
        const updatePost = await Student.updateOne({ idNo: req.userid.toUpperCase() },
            { $set: req.body });
        res.status(200).json(updatePost)
    } catch (err) {
        res.status(400).json({ message: err })
    }
});


router.post('/feedback', verify, async (req, res) => {

    try {
        const feedback = new Feedback({
            idNo: req.userid,
            message: req.body.message
        });
        await feedback.save();
        return res.status(200).send({ success: true, message: 'Feedback sent successfully' })
    } catch (err) {
        res.status(400).json({ message: err });
    }
});


// get Notifications
router.get('/notifications', verify, async (req, res) => {

    if (!req.userid) return res.status(401).send({ success: false, message: 'Unauthorized Request' });
    try {
        const posts = await Notification.find();
        res.status(200).json({ success: true, message: posts });
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

// get Notifications
router.post('/notifications', verify, async (req, res) => {

    if (!req.userid) return res.status(401).send({ success: false, message: 'Unauthorized Request' });

    const data = new Notification({
        type: req.body.type,
        title: req.body.title,
        description: req.body.description,
        externals: req.body.externals ? req.body.externals : undefined
    });

    try {
        await data.save();
        res.status(200).json({ success: true, message: 'Posted successfully' });
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

module.exports = router;