import { Request, Response } from 'express';
import Lesson from '../../models/lesson.model';

class LessonController {
    /**
     * Get all lessons
     * @param {Request} req - request object
     * @param {Response} res - response object
     * @returns {Promise<void>} - response object
     * @memberof LessonController
     */
    static async get(req: Request, res: Response): Promise<void> {
        try {
            const { lesson_id } = req.params;

            if (!lesson_id) {
                res.status(400).send({
                    message: 'Lesson ID is required',
                });
                return;
            }

            const lesson = await Lesson.findByPk(lesson_id);
            res.status(200).send(lesson);
        } catch (error: any) {
            res.status(500).send({
                message:
                    error.message ||
                    'Some error occurred while fetching the lesson.',
            });
        }
    }

    /**
     * Get all lessons
     * @param {Request} req - request object
     * @param {Response} res - response object
     * @returns {Promise<void>} - response object
     * @memberof LessonController
     */
    static async getAll(req: Request, res: Response): Promise<void> {
        try {
            const lessons = await Lesson.findAll();
            res.status(200).send(lessons);
        } catch (error: any) {
            res.status(500).send({
                message:
                    error.message ||
                    'Some error occurred while fetching the lessons.',
            });
        }
    }

    /**
     * Create a new lesson
     * @param {Request} req - request object
     * @param {Response} res - response object
     * @returns {Promise<void>} - response object
     * @memberof LessonController
     */
    static async create(req: Request, res: Response): Promise<void> {
        try {
            const { title, video_url, order, content, module_id } = req.body;
            const lesson = await Lesson.create({
                title,
                content,
                module_id,
                video_url,
                order,
            });
            res.status(201).send(lesson);
        } catch (error: any) {
            res.status(500).send({
                message:
                    error.message ||
                    'Some error occurred while creating the lesson.',
            });
        }
    }

    /**
     * Update a lesson
     * @param {Request} req - request object
     * @param {Response} res - response object
     * @returns {Promise<void>} - response object
     * @memberof LessonController
     */
    static async update(req: Request, res: Response): Promise<void> {
        try {
            const { lesson_id } = req.params;
            const { title, video_url, order, content, module_id } = req.body;
            const lesson = await Lesson.findByPk(lesson_id);
            if (lesson) {
                if (title) lesson.title = title;
                if (video_url) lesson.video_url = video_url;
                if (order) lesson.order = order;
                if (content) lesson.content = content;
                if (module_id) lesson.module_id = module_id;

                await lesson.save();
                res.status(200).send(lesson);
            } else {
                res.status(404).send({
                    message: 'Lesson not found',
                });
            }
        } catch (error: any) {
            res.status(500).send({
                message:
                    error.message ||
                    'Some error occurred while updating the lesson.',
            });
        }
    }

    /**
     * Delete a lesson
     * @param {Request} req - request object
     * @param {Response} res - response object
     * @returns {Promise<void>} - response object
     * @memberof LessonController
     */
    static async delete(req: Request, res: Response): Promise<void> {
        try {
            const { lesson_id } = req.params;
            if (!lesson_id) {
                res.status(400).send({
                    message: 'Lesson ID is required',
                });
                return;
            }
            const lesson = await Lesson.findByPk(lesson_id);
            if (lesson) {
                await lesson.destroy();
                res.status(200).send({
                    message: 'Lesson deleted successfully',
                });
            }
        } catch (error: any) {
            res.status(500).send({
                message:
                    error.message ||
                    'Some error occurred while deleting the lesson.',
            });
        }
    }
}

export default LessonController;
