import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const sendMail = async (token, email) => {
    try {
        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'erdoronal28@gmail.com',
                pass: process.env.EMAIL_PASSWORD
            }
        });

        let mailDetails = {
            from: 'erdoronal28@gmail.com',
            to: email,
            subject: 'Test mail',
            text: `http://localhost:3000/forgetPassword/${token}`
        };
        
        mailTransporter.sendMail(mailDetails, function(err, data) {
            if(err) {
                console.log(err);
            } else { 
                console.log('Email sent successfully');
            }
        });
    } catch (error) {
        res.status(500).send('error from this')
    }
}

export default sendMail

