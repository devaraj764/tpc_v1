const nodemailer = require('nodemailer');

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mdevaraju764@gmail.com',
        pass: 'ifueftmfazhobqoo'
    }
});

const sendMail = async(email, url) => {

    let details = {
        from: "mdevaraju764@gmail.com",
        to: email,
        subject: "Password Reset",
        text: `<h4>Reset your password</h4><br/><p>Valid only for 90seconds</p><br/><a href=${url}>Click here</a>`
    }

    try{
        await mailTransporter.sendMail(details);
        return true;
    }catch(err){
        console.log(err)
        return false;
    }
}

module.exports = sendMail;