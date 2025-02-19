import { Router } from 'express';
import CourseController from '../controllers/course.controller';

const CourseRoute = Router();

CourseRoute.post('/', CourseController.create)
    .get('/', CourseController.getAll)
    .get('course_id', CourseController.getById)
    .patch('/:course_id', CourseController.update)
    .delete('/:course_id', CourseController.delete);

export default CourseRoute;
