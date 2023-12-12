const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config();


const app = express();


// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5173',
}))

const port = process.env.PORT || 3000;
const password = process.env.PASSWORD


// Create a transport object for sending emails
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'nathanim2tadele@gmail.com',
        pass: `${password}`
    },
    tls : { rejectUnauthorized: false }
});



// Define a route to handle form submissions
app.post('/send', (req, res) => {
    const {
        name,
        email,
        message
    } = req.body;

    // Create email data
    const mailOptions = {
        from: email,
        to: 'nathanim2tadele@gmail.com',
        subject: 'Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending the email');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});