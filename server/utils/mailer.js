import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

export const sendConfirmationEmail = async (options) => {
  const {userId, fullName, userEmail, subject, text } = options;

  const testAccount = await nodemailer.createTestAccount();

  console.log('testAccount', testAccount)

  const transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  })

  jwt.sign(
    {userId, userEmail},
    process.env.EMAIL_SECRET,
    {expiresIn: '15s'},
    (err, token) => {
      const url = `http://localhost:5000/v1/auth/confirmation/${token}`

      let message = {
        from: `Dev team <${testAccount.user}>`,
        to: `${fullName} <${userEmail}>`,
        subject: subject,
        text: text,
        html: `<b>Please follow this link to confirm your email: </b> <br /> <a target="_blank" href=${url} >${url}</a>`
      }

      transporter.sendMail(message, (err, info) => {
        if (err) {
          console.log('Error occurred. ' + err.message);
          return process.exit(1);
        }
    
        console.log('Message sent: %s', info.messageId);
    
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      })
    }
  )
}