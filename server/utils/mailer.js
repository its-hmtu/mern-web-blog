import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

const createTestAccount = async () => {
  return await nodemailer.createTestAccount();
}

export const sendConfirmationEmail = async (options) => {
  const {userId, fullName, userEmail, subject, text } = options;

  const testAccount = await createTestAccount();

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  })

  jwt.sign(
    {userId, userEmail},
    process.env.EMAIL_SECRET,
    {expiresIn: '1h'},
    (err, token) => {
      const url = `http://localhost:5000/v1/auth/confirmation/${token}`

      let message = {
        from: `Dev team <${testAccount.user}>`,
        to: `${fullName} <${userEmail}>`,
        subject: subject,
        text: text,
        html: `<b>Please follow this link to confirm your email: </b> <br /> <button><a target="_blank" href=${url} >Click here</a></button>`
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

export const sendPasswordResetEmail = async (options) => {
  const {userId, fullName, userEmail, subject, text } = options;

  const testAccount = await createTestAccount();

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  })

  jwt.sign(
    {userId, userEmail},
    process.env.FORGOT_PASSWORD_SECRET,
    {expiresIn: '1h'},
    (err, token) => {
      const url = `http://localhost:5000/v1/auth/reset-password/${token}`

      let message = {
        from: `Dev team <${testAccount.user}>`,
        to: `${fullName} <${userEmail}>`,
        subject: subject,
        text: text,
        html: `<b>Please follow this link to reset your password: </b> <br /> <a target="_blank" href=${url} >Click here</a>`
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

export const sendEmailNotification = async (options) => {
  const { userId, fullName, userEmail, subject, text } = options;

  const testAccount = await createTestAccount();

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  })

  let message = {
    from: `Dev team <${testAccount.user}>`,
    to: `${fullName} <${userEmail}>`,
    subject: subject,
    text: text,
    html: `<b>${text}</b>`
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