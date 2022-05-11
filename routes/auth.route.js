const { response } = require('express');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Student = require('../model/Student.js');
const router = express.Router();
const Joi = require('@hapi/joi');
const cors = require('cors');


// VALIDATION SCHEMA
const schema = Student;

// signIn user
router.post('/login', async (req, res) => {
    // Checking if the username already exists
    try {
        const user = await schema.findOne({ idNo: req.body.idNo.toUpperCase() });
        if (!user) return res.status(400).json({ success: false, error: `Enter valid credentials` });

        // checking the password is valid
        const valPass = await bcrypt.compare(req.body.password, user.password);
        if (!valPass) return res.status(400).json({ success: false, error: 'Invalid password' })

        const token = jwt.sign({ idNo: user.idNo }, process.env.TOKEN_SECRET);
        res.setHeader('auth-token', token);
        return res.status(200).send({ success: true, message: `welcome back ${req.body.idNo}`, token: token })
    } catch (err) { console.log(err) }

})

// signUp users
router.post('/register', async (req, res) => {
    // Checking if the username already exists
    try {
        const isUser = await schema.findOne({ idNo: req.body.idNo.toUpperCase() });
        if (isUser) return res.status(400).json({ success: false, error: `${req.body.idNo} had already been taken` });
    } catch (err) { res.status(400).json({ success: false, error: "error finding user" }) }

    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    // creating new User
    const user = new schema({
        name: req.body.name,
        idNo: req.body.idNo.toUpperCase(),
        email: req.body.email,
        class: req.body.class,
        batch: req.body.batch,
        yearofStudy: req.body.yearofStudy,
        address: req.body.address,
        dob: req.body.dob,
        contactNumber: req.body.contactNumber,
        password: hashedPass
    });
    try {
        await user.save();
        const token = jwt.sign({ idNo: user.idNo }, process.env.TOKEN_SECRET);
        res.setHeader('auth-token', token);
        return res.status(200).send({ success: true, message: `Account Created Successfully`, token: token })

    } catch (err) { res.status(400).json({ success: false, error: "Err" }) }
})

module.exports = router;