import { Router } from 'express';
import CourseController from '../controllers/course.controller';
import passport from 'passport';

const CourseRoute = Router();

CourseRoute.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    CourseController.create
)
    .get('/', CourseController.getAll)
    .get('course_id', CourseController.getById)
    .patch(
        '/:course_id',
        passport.authenticate('jwt', { session: false }),
        CourseController.update
    )
    .delete(
        '/:course_id',
        passport.authenticate('jwt', { session: false }),
        CourseController.delete
    );

export default CourseRoute;
