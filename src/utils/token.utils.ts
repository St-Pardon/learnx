import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.config';
import { UserAttributes } from '../interface/attributes';

export const generateVerificationToken = (user: UserAttributes) => {
    return jwt.sign({ userId: user.user_id }, JWT_SECRET, { expiresIn: '1h' });
};
