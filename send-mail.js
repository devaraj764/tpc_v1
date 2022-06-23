const nodemailer = require('nodemailer');


const user = 'cseplacements@rguktsklm.ac.in';
const pass = 'hnkpehvamzwvulvy';

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        // user: 'mdevaraju764@gmail.com',
        // pass: 'ifueftmfazhobqoo'
        user: user,
        pass: pass
    }
});

const sendMail = async (email, url) => {

    let details = {
        from: user,
        to: email,
        subject: "Password Reset",
        html: `<h4>Reset your password</h4><p>Valid only for 10min</p><a href="${url}">Click here</a>`
    }

    try {
        await mailTransporter.sendMail(details);
        return true;
    } catch (err) {
        console.log(err)
        return false;
    }
}

module.exports = sendMail;