var path = require('path');
require('dotenv').config({path: path.resolve(__dirname + '/.env')});
const nodemailer = require('nodemailer');
 'usestrict'

// setup mail transporter service
const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: 'yourmail@hotmail.com', // your email
      pass: 'password'              // your password
    }
  });
  
// setup email data with unicode symbols
//   const mailOptions = {
//     from: 'sender@hotmail.com',              // sender
//     to: 'receiver@hotmail.com',              // list of receivers
//     subject: 'Hello from sender',            // Mail subject
//     html: '<b>Do you receive this mail?</b>' // HTML body
//   };
//   console.log(transporter)
  
  // send mail with defined transport object
  var smtpConfig = {
    pool:true,
    host: 'smtp.mailgun.org',
    port: 587,
    secure: true, // use SSL
    auth: {
        user: 'postmaster@sandbox22c7eaf17fc24db29897193fb1e83822.mailgun.org',
        pass: 'pass'
    }
};
transporter.smtpConfig = smtpConfig;



  
module.exports = transporter;