const nodemailer = require('nodemailer');
function sendMailOnRegistration(toMail,subject,content){
    console.log(`Inside sendMail() function`)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'mozammilmd6@gmail.com',
          pass:"mexo rpey pjch vpoq"
        }
      });
    const emailContent=`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f2f2f2;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #333333;
                text-align: center;
            }
            p {
                color: #555555;
                font-size: 16px;
                line-height: 1.6;
                margin-bottom: 20px;
            }
            .otp-container {
                background-color: #f9f9f9;
                padding: 15px;
                border-radius: 5px;
                text-align: center;
            }
            .otp {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Welcome to Our Web App!</h1>
            <p>Thank you for registering with us. To complete your registration, please verify your email address by entering the OTP below:</p>
            <div class="otp-container">
                <p class="otp">Your OTP: <span id="otp">${content}</span></p>
            </div>
            <p>If you did not register with us, please ignore this email.</p>
        </div>
    </body>
    </html>
    `  
    const mailOptions = {
        from: 'mozammilmd6@gmail.com',
        to: toMail,
        subject: subject,
        //text: content
        html: emailContent
      };  
    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });  
}

module.exports={sendMailOnRegistration}