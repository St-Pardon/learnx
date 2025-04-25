import { generateVerificationToken } from './token.utils';
import { UserAttributes } from '../interface/attributes';
import transporter from '../config/nodemailer.config';
import { BASE_URI } from '../config/env.config';

export const sendVerificationEmail = async (user: UserAttributes) => {
    const token = generateVerificationToken(user);
    try{
        const verificationLink = `${BASE_URI}/auth/verify?token=${token}`;
        console.log(verificationLink)
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Verify Your Email',
            html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
        };
        
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error)
    }
};

export const resetPasswordEmail = async (user: UserAttributes) => {
    const token = generateVerificationToken(user);
    try{
        const verificationLink = `${BASE_URI}/auth/reset-password?token=${token}`;
        console.log(verificationLink)
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Reset Your Password',
            html: `<p>Click <a href="${verificationLink}">here</a> to reset your password.</p>`,
        };
        
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error)
    }
}