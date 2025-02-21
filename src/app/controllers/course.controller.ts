import { Response, Request } from 'express';
import Course from '../../models/course.model';
import { CourseAttributes } from '../../interface/attributes';

class CourseController {
    /**
     * Get all courses
     * @param {Request} req - request object
     * @param {Response} res - response object
     * @returns {Promise<void>} - response object
     * @memberof CourseController
     */
    static async getAll(req: Request, res: Response): Promise<void> {
        try {
            const courseData = await Course.findAll();

            res.status(200).send(courseData);
        } catch (error: any) {
            res.status(500).send({
                message:
                    error.message ||
                    'Some error occurred while fetching the courses.',
            });
        }
    }

    /**
     * Get course by id
     * @param {Request} req - request object
     * @param {Response} res - response object
     * @returns {Promise<void>} - response object
     * @memberof CourseController
     */
    static async getById(req: Request, res: Response): Promise<void> {
        try {
            const { course_id } = req.params;
            const courseData = await Course.findByPk(course_id);

            res.status(200).send(courseData);
        } catch (error: any) {
            res.status(500).send({
                message:
                    error.message ||
                    'Some error occurred while fetching the course.',
            });
        }
    }

    /**
     * Create a new course
     * @param {Request} req - request object
     * @param {Response} res - response object
     * @returns {Promise<void>} - response object
     * @memberof CourseController
     */
    static async create(
        req: Request & { user?: any },
        res: Response
    ): Promise<void> {
        try {
            const { title, description, category, level } = req.body;
            const user_id = req.user.userid;
            const course = {} as CourseAttributes;

            if (title) course['title'] = title;
            if (description) course['description'] = description;
            if (category) course['category'] = category;
            if (level) course['level'] = level;
            if (user_id) course['created_by'] = user_id;
            const newCourse = new Course(course);

            await newCourse.save();

            res.status(201).send({
                message: 'Course created successfully!',
            });
        } catch (error: any) {
            res.status(500).send({
                message:
                    error.message ||
                    'Some error occurred while creating the course.',
            });
        }
    }

    /**
     * Update course
     * @param {Request} req - request object
     * @param {Response} res - response object
     * @returns {Promise<void>} - response object
     * @memberof CourseController
     */
    static async update(req: Request, res: Response): Promise<void> {
        try {
            const { course_id } = req.params;
            const { title, description, category, level } = req.body;
            const course = {} as CourseAttributes;

            if (title) course['title'] = title;
            if (description) course['description'] = description;
            if (category) course['category'] = category;
            if (level) course['level'] = level;

            await Course.update(course, {
                where: { course_id },
            });

            res.status(200).send({
                message: 'Course updated successfully!',
            });
        } catch (error: any) {
            res.status(500).send({
                message:
                    error.message ||
                    'Some error occurred while updating the course.',
            });
        }
    }

    /**
     * Delete course
     * @param {Request} req - request object
     * @param {Response} res - response object
     * @returns {Promise<void>} - response object
     * @memberof CourseController
     */
    static async delete(req: Request, res: Response): Promise<void> {
        try {
            const { course_id } = req.params;

            await Course.destroy({
                where: { course_id },
            });

            res.status(200).send({
                message: 'Course deleted successfully!',
            });
        } catch (error: any) {
            res.status(500).send({
                message:
                    error.message ||
                    'Some error occurred while deleting the course.',
            });
        }
    }
}

export default CourseController;
