const nodemailer = require('nodemailer');

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mdevaraju764@gmail.com',
        pass: 'ifueftmfazhobqoo'
    }
});

let details = {
    from: "mdevaraju764@gmail.com",
    to: "s170703@rguktsklm.ac.in",
    subject: "Test mail Nodemailer",
    text: "Test mail Nodemailer Successfull"
}

mailTransporter.sendMail(details, (err) => {
    if(err){
        console.log(err.message);
    }else{
        console.log("Mail sent successfully")
    }
});