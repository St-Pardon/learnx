import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/env.config';
import { User } from '../../models/entity.model';

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
                    console.log('first');
                    res.status(400).json({
                        message: 'An Error occurred',
                        reason: msg.message,
                    });

                    return;
                }
                if (!user) {
                    console.log('second');
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
    
            const user = await User.findByPk(decoded.userId);
            if (!user) {
                res.status(400).json({ message: 'Invalid verification link' });
                return 
            }
    
            user.isVerified = true;
            await user.save();
    
            res.json({ message: 'Email verified successfully' });
        } catch (error) {
            res.status(400).json({ message: 'Invalid or expired token' });
        }
    }
}

export default AuthController;
