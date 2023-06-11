const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});
const sendEmail = async (to, subject, text) => {
  const msg = { from: process.env.EMAIL_FROM, to, subject, text };
  await transporter.sendMail(msg);
};

class EmailService {
    static checkEmailMessage = async (email, otp) => {
        const subject = "Verification OTP";
        const text = `Dear user,
        otp is : ${otp}`;
        await sendEmail(email, subject, text);
      };

      static ThankuMessage = async (email,name) => {
        const subject = "Thanku For Joining";
        const text = `Dear ${name},
            Thanku for Contacting`;
        await sendEmail(email, subject, text);
      };

      static ForgetPasswordMessage = async (email,name,password) => {
        const subject = "Forget Password";
        const text = `Dear ${name},
            Your New Password is :  ${password}
             reset after login ,
             do Not Share with anyone !!
        
        `;
        await sendEmail(email, subject, text);
      };
}

module.exports = EmailService;
