import { Router } from 'express';

import AuthController from '../controllers/auth.controller';

const AuthRoute = Router();

AuthRoute.post('/signup', AuthController.signup)
    .post('/login', AuthController.login)
    .patch('/verify', AuthController.verify)
    .patch('/reset-password', AuthController.reset)
    .patch('/update-password', AuthController.changePassword)
    .post('/forgot-password', AuthController.forgotPassword);

export default AuthRoute;
