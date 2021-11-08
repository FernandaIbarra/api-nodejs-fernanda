const nodemailer = require('nodemailer');
const email = process.env.EMAIL_ACCOUNT;

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: email,
        pass: process.env.EMAIL_PASSWORD,
    },
});

module.exports.sendValidationEmail = (user) =>{
    transporter
        .sendMail({
            from: `"Test email" <${email}>`,
            to: user.email,
            subject: "Welcome",
            html: `
                    <h1>Welcome to test </h1>
                    <p>To activate your account</p>
                    <a href="http://localhost:8000/api/users/${user.id}/activate">click here</a>    

                `,
        })
        .then(()=> {
            console.log(`email sent to ${user.id}`);
        })
        .catch((err) => {
            console.log(`error sending email`, err);
        })
}