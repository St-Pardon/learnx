import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/env.config';
import { User } from '../../models/entity.model';
import { resetPasswordEmail } from '../../utils/verification.utils';

class AuthController {
    /**
     * Authenticate user signup request
     * @param {Request} req - request object
     * @param {Response} res - response object
     * @param {NextFunction} next - next function
     * @returns {Promise<void>} - response object
     */
    static async signup(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        passport.authenticate(
            'signup',
            async (err: any, user: any, msg: any) => {
                if (err) {
                    res.status(400).json({
                        message: 'An Error occurred',
                        reason: msg.message,
                    });

                    return;
                }
                if (!user) {
                    res.status(400).json({
                        message: 'An Error occurred',
                        reason: msg.message,
                    });
                    return;
                }
                res.status(201).json({
                    message: 'Signup successful',
                    user: req.user,
                });
            }
        )(req, res, next);
    }

    /**
     * Authenticate user signin request
     * @param {Request} req - request object
     * @param {Response} res - response object
     * @param {NextFunction} next - next function
     * @returns {Promise<void>} - response object
     */
    static async login(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        passport.authenticate(
            'login',
            async (err: any, user: any, info: any) => {
                try {
                    if (err) {
                        const error = new Error('An Error occurred');
                        return next(error);
                    }
                    if (!user) {
                        return res.status(400).json({ message: info.message });
                    }
                    req.login(user, { session: false }, async (error) => {
                        if (error) return next(error);

                        const body = { userid: user.user_id, email: user.email };
                        const access_token = jwt.sign({ user: body }, JWT_SECRET);
                        res.status(200).json({
                            message: 'Login successful',
                            access_token,
                        });
                    });
                } catch (error) {
                    return next(error);
                }
            }
        )(req, res, next);
    }

    /**
     * verify user email
     * @param {Request} req - request object
     * @param {Response} res - response object
     * @returns {Promise<void>} - response object
     * @memberof AuthController
     */
    static async verify(req: Request, res: Response): Promise<void> {
        try {
            const { token } = req.query;
            if (typeof token !== 'string') {
                res.status(400).json({ message: 'Invalid token format' });
                return;
            }
            const decoded: any = jwt.verify(token, JWT_SECRET);

            // check if token is expired 
            if (decoded.exp * 1000 < Date.now()) {
                res.status(400).json({ message: 'Token expired' });
                return;
            }

            const userId = decoded.userId;
            const user = await User.findByPk(userId);
            
            if (!user) {
                res.status(400).json({ message: 'Invalid verification link' });
                return 
            }
            
            // check if user is already verified
            if (user.isVerified) {
                res.status(400).json({ message: 'Account already verified' });
                return;
                
            }
            user.isVerified = true;
            await user.save();
    
            res.json({ message: 'Email verified successfully' });
        } catch (error) {
            res.status(400).json({ message: 'Invalid or expired token' });
        }
    }

    /**
     * Reset user password
     * @param {Request} req - request object
     * @param {Response} res - response object
     * @returns {Promise<void>} - response object
     * @memberof AuthController
     */
    static async reset(req: Request, res: Response): Promise<void> {
        try {
            const { token } = req.query;
            if (typeof token !== 'string') {
                res.status(400).json({ message: 'Invalid token format' });
                return;
            }
            const decoded: any = jwt.verify(token, JWT_SECRET);

            // check if token is expired 
            if (decoded.exp * 1000 < Date.now()) {
                res.status(400).json({ message: 'Token expired' });
                return;
            }

            const userId = decoded.userId;
            const user = await User.findByPk(userId);
            if (!user) {
                res.status(400).json({ message: 'Invalid reset link' });
                return;
            }

            const { password } = req.body;
            if (!password) {
                res.status(400).json({ message: 'Password is required' });
                return;
            }
            user.password = password;
            await user.save();

            res.json({ message: 'Password reset successfully' });
        } catch (error) {
            res.status(400).json({ message: 'Invalid or expired token' });
        }
    }

    /** 
     * change user password
     * @param {Request} req - request object 
     * @param {Response} res - response object
     * @returns {Promise<void>} - response object
     * @memberof AuthController
     */
    static async changePassword(
        req: Request & { user?: any },
        res: Response
    ): Promise<void> {
        try {
            const { oldPassword, newPassword } = req.body;
            const userId = req.user?.userid;
            if (!userId) {
                res.status(400).json({ message: 'User ID is required' });
                return;
            }
            const user = await User.findByPk(userId);
            if (!user) {
                res.status(400).json({ message: 'User not found' });
                return;
            }
            if (user.password !== oldPassword) {
                res.status(400).json({ message: 'Old password is incorrect' });
                return;
            }
            user.password = newPassword;
            await user.save();

            res.json({ message: 'Password changed successfully' });
        } catch (error) {
            res.status(400).json({ message: 'Error changing password' });
        }
    }

    /**
     * forgot password
     * @param {Request} req - request object
     * * @param {Response} res - response object
     * @returns {Promise<void>} - response object
     * @memberof AuthController
     */
    static async forgotPassword(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const { email } = req.body;
            if (!email) {
                res.status(400).json({ message: 'Email is required' });
                return;
            }
            const user = await User.findOne({ where: { email } });
            if (!user) {
                res.status(400).json({ message: 'User not found' });
                return;
            }

            await resetPasswordEmail(user);

            res.json({ message: 'Reset link sent to your email' });
        } catch (error) {
            res.status(400).json({ message: 'Error sending reset link' });
        }
    }

}

export default AuthController;
