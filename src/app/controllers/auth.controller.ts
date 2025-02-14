import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/env.config';

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
                    console.log(user);
                    console.log(msg);
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

                        const body = { _id: user._id, email: user.email };
                        const token = jwt.sign({ user: body }, JWT_SECRET);
                        res.status(200).json({
                            message: 'Login successful',
                            token,
                        });
                    });
                } catch (error) {
                    return next(error);
                }
            }
        )(req, res, next);
    }
}

export default AuthController;
