import { Router } from 'express';

import AuthController from '../controllers/auth.controller';

const AuthRoute = Router();

AuthRoute.post('/signup', AuthController.signup).post(
    '/login',
    AuthController.login
);

export default AuthRoute;
