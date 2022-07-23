const express = require('express');
const Alumini = require('../model/Alumini.js');
const router = express.Router();
const sendMail = require('../send-mail.js');
require('dotenv/config');

const URI = 'https://placementcell.rguktsklm.ac.in/alumini/profile'

router.post('/new', async (req, res) => {
    const { idNo } = req.body;
    // check if user exiists
    var isUser;
    try {
        isUser = await Alumini.findOne({ idNo: idNo.toUpperCase() });
    } catch (err) { res.status(400).send({ success: false, message: err.message }) }

    if (isUser) {
        res.status(401).send({ success: false, message: "Response already taken with this ID number" });
    } else {
        const alumini = new Alumini({ ...req.body, idNo: req.body.idNo.toUpperCase() });
        try {
            await alumini.save();
            const uri = `${URI}/${req.body.idNo.toUpperCase()}`;
            const html = `<h4>Thankyou ${req.body.name}, <br/> for responding for alumini form.</h4><p>Visit your alumini profile: </p><a href="${uri}">Click here</a>`
            const mail = sendMail({ emails: req.body.email, subject: 'Alumini ', body: html });
            if (mail) {
                console.log('mail sent');
                res.status(200).send({ success: true, message: 'Check your registered mail' });
            } else {
                res.status(400).send({ success: false, message: 'Error sending email' })
            }
        } catch (err) { res.status(400).send({ success: false, message: err.message }) }
    }
});

router.get('/profile/:id', async (req, res) => {
    const id = req.params.id;
    var aluminiData;
    try {
        aluminiData = await Alumini.findOne({ idNo: id.toUpperCase() });
    } catch (err) { res.status(400).send({ success: false, message: err.message }) }

    if (aluminiData) {
        res.status(200).send({ success: true, data: aluminiData });
    } else {
        res.status(401).send({ success: false, message: "No record found with id " + id });
    }
})

module.exports = router;