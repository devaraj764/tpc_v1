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
    // validating data before saving
    // const { error } = Joi.validate(req.body, schema);
    // if (error) return res.status(400).json({ success: false, error: error.details[0].message })

    // Checking if the username already exists
    try {
        const user = await Student.findOne({ idNo: req.body.idNo.toUpperCase() });
        if (!user) return res.status(400).json({ success: false, error: `Enter valid credentials` });

        // checking the password is valid
        const valPass = await bcrypt.compare(req.body.password, user.password);
        if (!valPass) res.status(400).json({ success: false, error: 'Invalid password' })

        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
        res.status(200).setHeader('auth-token', token).json({ success: true, message: `welcome back ${req.body.idNo}`, token: token })

    } catch (err) { res.status(400).json({ success: false, error: "Error perfoming action" }) }

})

// signUp users
router.post('/register', async (req, res) => {

    // validating data before saving
    // const { error } = Joi.validate(req.body, schema);
    // if (error) return res.status(400).json({ success: false, error: error.details[0].message })

    // Checking if the username already exists
    try {
        const isUser = await Student.findOne({ idNo: req.body.idNo.toUpperCase() });
        if (isUser) return res.status(400).json({ success: false, error: `${req.body.idNo} had already been taken` });
    } catch (err) { res.status(400).json({ success: false, error: err }) }

    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    // creating new User
    const user = new Student({
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
        res.status(200).json({ success: true, message: 'Account created successfully' });

    } catch (err) { res.status(400).json({ success: false, error: err }) }
})

module.exports = router;