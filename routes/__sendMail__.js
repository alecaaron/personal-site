const express = require('express');
const nodeMailer = require('nodemailer');

let transport = nodeMailer.createTransport({
  host: 'mail.alecaaron.com',
  port: 587,
  secure: false,
  auth: {
    user: "hello@alecaaron.com",
    pass: "8Characters"
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
