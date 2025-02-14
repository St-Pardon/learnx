import { Router } from 'express';
import UserController from '../controllers/user.controller';
import passport from 'passport';

const UserRoute = Router();

UserRoute.put(
    '/update',
    passport.authenticate('jwt', { session: false }),
    UserController.update
);

export default UserRoute;
