import { Response, Request } from 'express';
import Lesson from '../../models/lesson.model';
import Module from '../../models/module.model';
import { ModuleAttributes } from '../../interface/attributes';

class ModuleController {
    // get modules
    static async get(res: Response, req: Request) {
        try {
            const modules = await Module.findAll({
                include: [
                    {
                        model: Lesson,
                        as: 'lessons',
                    },
                ],
            });
            res.status(200).json({ modules });
        } catch (error: any) {
            res.status(500).send({
                message:
                    error.message ||
                    'Some error occurred while fetching the lesson.',
            });
        }
    }

    // get module by id
    static async getById(res: Response, req: Request) {
        try {
            const { module_id } = req.params;

            if (!module_id) {
                res.status(400).send({
                    message: 'Module ID is required',
                });
                return;
            }

            const module = await Module.findByPk(module_id, {
                include: [
                    {
                        model: Lesson,
                        as: 'lessons',
                    },
                ],
            });
            res.status(200).send(module);
        } catch (error: any) {
            res.status(500).send({
                message:
                    error.message ||
                    'Some error occurred while fetching the lesson.',
            });
        }
    }
    // create module
    static async create(res: Response, req: Request) {
        try {
            const { course_id, title, description, order } = req.body;
            const data = {} as ModuleAttributes;

            if (!course_id || !title || !description || !order) {
                res.status(400).send({
                    message:
                        'Course ID, title, description and order are required',
                });
                return;
            }

            if (course_id) data['course_id'] = course_id;
            if (title) data['title'] = title;
            if (description) data['description'] = description;
            if (order) data['order'] = order;

            const module = await Module.create(data);

            res.status(201).json({
                msg: 'Module Created Successfully',
                data: module,
            });
        } catch (error: any) {
            res.status(500).send({
                message:
                    error.message ||
                    'Some error occurred while creating the module.',
            });
        }
    }
    // update module
    static async update(res: Response, req: Request) {
        try {
            const { module_id } = req.params;
            const { title, description, order } = req.body;
            const data = {} as ModuleAttributes;

            if (!module_id) {
                res.status(400).send({
                    message: 'Module ID is required',
                });
                return;
            }

            if (title) data['title'] = title;
            if (description) data['description'] = description;
            if (order) data['order'] = order;

            const module = await Module.update(data, {
                where: { module_id },
            });

            res.status(200).json({
                msg: 'Module Updated Successfully',
                data: module,
            });
        } catch (error: any) {
            res.status(500).send({
                message:
                    error.message ||
                    'Some error occurred while updating the module.',
            });
        }
    }
    // delete module
    static async delete(res: Response, req: Request) {
        try {
            const { module_id } = req.params;

            if (!module_id) {
                res.status(400).send({
                    message: 'Module ID is required',
                });
                return;
            }

            await Module.destroy({
                where: { module_id },
            });

            res.status(200).send({
                message: 'Module Deleted Successfully',
            });
        } catch (error: any) {
            res.status(500).send({
                message:
                    error.message ||
                    'Some error occurred while deleting the module.',
            });
        }
    }
}

export default ModuleController;
