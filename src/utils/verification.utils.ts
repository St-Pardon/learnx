import nodemailer from 'nodemailer';
import { generateVerificationToken } from './token.utils';
import { User } from '../models/entity.model';
import { EMAIL_PASS, EMAIL_SERVICE, EMAIL_USER } from '../config/env.config';
import { UserAttributes } from '../interface/attributes';

const transporter = nodemailer.createTransport({
    service: EMAIL_SERVICE,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});

export const sendVerificationEmail = async (user: UserAttributes) => {
    const token = generateVerificationToken(user);
    try{
        const verificationLink = `http://localhost:5000/auth/verify?token=${token}`;
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
