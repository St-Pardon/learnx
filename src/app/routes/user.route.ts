import { Router } from 'express';
import UserController from '../controllers/user.controller';
import passport from 'passport';

const UserRoute = Router();

UserRoute.get(
    '/all',
    passport.authenticate('jwt', { session: false }),
    UserController.getAll
)
    .get(
        '/:id?',
        passport.authenticate('jwt', { session: false }),
        UserController.get
    )
    .put(
        '/:id?',
        passport.authenticate('jwt', { session: false }),
        UserController.update
    )
    .delete(
        '/:id?',
        passport.authenticate('jwt', { session: false }),
        UserController.delete
    )
    .patch(
        '/deactivate/:id?',
        passport.authenticate('jwt', { session: false }),
        UserController.deactivate
    )
    .patch(
        '/reactivate/:id?',
        passport.authenticate('jwt', { session: false }),
        UserController.reactivate
    );

export default UserRoute;
