const nodemailer = require("nodemailer");
const sgMail = require('@sendgrid/mail');


sgMail.setApiKey(process.env.SENDGRID_API_KEY)



const transporter = nodemailer.createTransport({
    service:'SendGrid',
    auth: {
      user: "apikey",
      pass: process.env.SENDGRID_API_KEY,
    },
});


const mail = async (email, html) => {
    try {
        const info = await transporter.sendMail({
        from: process.env.EMAIL_FROM, 
        to: email, 
        subject: "Verify your account",
        html,
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    } catch (error) {
        console.error(error);
        throw new Error('error with sending an e-mail!')
        
    }

}
module.exports = mail