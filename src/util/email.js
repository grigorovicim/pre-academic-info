const nodemailer = require('nodemailer');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

// send an email to the given user containing the activation link
function send(user, host) {
    const emailData = 
    'Hello!\n You are receiveing this message because you have registered on preAcademicInfo.\n' +
    'Please use the following link in order to verify your account: ' + host + user.verification_token + '\n' +
    'After activating you account you can use the following password to login: ' + user.password + '\n' +
    '\n\nKind regards,\nThe preAcademicInfo team';

    let transporter = nodemailer.createTransport({
        host: 'smtp.mail.yahoo.com',
        port: 465,
        secure: true,
        auth: {
            user: config.email.username,
            pass: config.email.password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: '"preAcademicInfo" <' + config.email.username + '>',
        to: user.username,
        subject: 'preAcademicInfo email verification',
        text: emailData, 
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }

        console.log('Message sent: %s', info.messageId);
    });
};

module.exports = {
    send: send
};
