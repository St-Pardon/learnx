import { Router } from 'express';
import LessonController from '../controllers/lesson.controller';

const LessonRoute = Router();

LessonRoute.post('/', LessonController.create)
    .get('/', LessonController.getAll)
    .get('/:lesson_id', LessonController.get)
    .patch('/:lesson_id', LessonController.update)
    .delete('/:lesson_id', LessonController.delete);


export default LessonRoute;