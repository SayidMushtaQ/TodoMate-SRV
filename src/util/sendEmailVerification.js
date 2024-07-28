import { transporter } from "../config/nodemailer.config.js";

const htmlContentHandler = ({email,userName,uri}) => {
  return `
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background: white; color: #333;">
            <div style="max-width: 600px; margin: 50px auto; background: #fff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); overflow: hidden;">
                <div style="background: linear-gradient(to right, #ff758c, #ff7eb3); padding: 20px; text-align: center; color: #fff;">
                    <h1 style="margin: 0;">Email Verification</h1>
                </div>
                <div style="padding: 30px; text-align: center;">
                    <h2 style="margin: 0 0 20px;">Welcome ${userName}!</h2>
                    <p style="margin: 0 0 20px;">Thank you for signing up. Please verify your ${email} address by clicking the button below.</p>
                    <a href="${uri}" style="display: inline-block; padding: 10px 20px; margin: 20px 0; color: #fff; background: #ff758c; border-radius: 5px; text-decoration: none;">Verify Email</a>
                    <p style="margin: 0;">If you didn't sign up for this account, you can ignore this email.</p>
                </div>
                <div style="background: #f4f4f4; padding: 10px; text-align: center; color: #777;">
                    <p style="margin: 0;">&copy; 2024 Your Company. All rights reserved.</p>
                </div>
            </div>
        </body>`;
};

export const sendEmailVerification = async (email, userName, uri) => {
  try {
    const htmlContent = htmlContentHandler({email,userName,uri});
    await transporter.sendMail({
        from:  `'"TodoMate 🚀" <${process.env.EMAIL_USERNAME}>'`,
        to: email,
        subject: "Verification EMAIL",
        html: htmlContent
    })
    console.log('success')
    return { success: true, message: "Verification URI sent successfully." };
  } catch (emailError) {
    console.error("Error sending verification email:", emailError);
    return { success: false, message: "Failed to send verification URI." };
  }
};