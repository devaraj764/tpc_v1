const { response } = require('express');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Student = require('../model/Student.js');
const router = express.Router();
const sendMail = require('../send-mail.js')

// URI
const URI = 'https://tpc-api.loca.lt';

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
    const user = new schema({...req.body, password: hashedPass,idNo:req.body.idNo.toUpperCase()});
    try {
        await user.save();
        const token = jwt.sign({ idNo: user.idNo }, process.env.TOKEN_SECRET);
        res.setHeader('auth-token', token);
        return res.status(200).send({ success: true, message: `Account Created Successfully`, token: token })

    } catch (err) { res.status(400).json({ success: false, error: err.message }) }
});


router.post('/forgot-password', async (req, res) => {
    const { idNo } = req.body;
    // check if user exiists
    var isUser;
    try {
        isUser = await Student.findOne({ idNo: idNo.toUpperCase() });
    } catch (err) { res.status(400).send({ success: false, message: err.message }) }

    if (isUser) {
        const secret = process.env.TOKEN_SECRET + isUser.password;
        const token = jwt.sign({ idNo: isUser.idNo }, secret, { expiresIn: '10m' });
        const uri = `${URI}/reset-password/${isUser.idNo}/${token}`;
        const html = `<h4>Reset your password</h4><p>Valid only for 10min</p><a href="${uri}">Click here</a>`
        const mail = sendMail({emails: isUser.email, subject:'Password reset', body: html});
        if (mail) {
            res.status(200).send({ success: true, message: 'Check your registered mail' });
        } else {
            res.status(400).send({ success: false, message: 'Error sending email' })
        }
    } else {
        res.status(401).send({ success: false, message: "User does not exist" })
    }
});

router.get('/reset-password/:idNo/:token', async (req, res) => {
    const idNo = req.params.idNo;
    const token = req.params.token;

    var isUser;
    try {
        isUser = await Student.findOne({ idNo: idNo.toUpperCase() });
    } catch (err) { res.status(400).send({ success: false, message: err.message }) }

    if (isUser) {
        const secret = process.env.TOKEN_SECRET + isUser.password;
        try {
            const verify = jwt.verify(token, secret);
            res.render('reset-password', { idNo: verify.idNo })
        } catch (err) { res.status(400).send({ success: false, message: err.message }) }

    } else {
        res.status(401).send({ success: false, message: "User does not exist" })
    }
});

router.post('/reset-password/:idNo/:token', async (req, res) => {
    const { idNo, token } = req.params;
    const { password, password1 } = req.body
    var isUser;
    try {
        isUser = await Student.findOne({ idNo: idNo.toUpperCase() });
    } catch (err) { res.status(400).send({ success: false, message: err.message }) }

    if (!isUser) return res.status(401).send({ success: false, message: "User does not exist" })

    const secret = process.env.TOKEN_SECRET + isUser.password;
    try {
        const verify = jwt.verify(token, secret);
        if (password !== password1) return res.status(401).send({ success: false, message: "confirm password doesn't match to password" });

        // Hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);


        await Student.updateOne({ idNo: verify.idNo.toUpperCase() },
            { $set: { password: hashedPass } });

        res.status(200).send("<h1>Password Reset successfull</h1>")
    } catch (err) { res.status(400).send({ success: false, message: err.message }) }


});

module.exports = router;