const express = require('express');
const nodeMailer = require('nodemailer');

let transport = nodeMailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  },
  tls: {rejectUnauthorized: false}
});

module.exports = express.Router()

.post('/', (req,res)=>{

  let mail = {
    from: {
      name: req.body.name,
      address: req.body.email
    },
    to: 'hello@alecaaron.com',
    subject: `New Message From alecaaron.com`,
    text: req.body.message
  }

  transport.sendMail(mail, (error, info)=>{
    if (error) { return console.log(error)};
    console.log('Message sent: %s', info.message);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
})


.get('/', (req, res)=>{
  res.render('404');
});
