import { Response, Request } from 'express';
// import { IUser } from "../../interface/attributes";
import { db } from '../../models/index.model';
import { User, UserInfo } from '../../models/entity.model';
import { UserAttributes, UserInfoAttributes } from '../../interface/attributes';

export class UserController {
    /**
     * update user endpoint
     * @param {Request} req - request object
     * @param {Response} res - response object
     * @returns {Promise<void>} - response object
     */
    static async update(
        req: Request & { user?: any },
        res: Response
    ): Promise<void> {
        try {
            const { id } = req.params;
            const userid = id ? id : req.user.userid; // get user id from params or token

            const { phone, address, country, firstname, lastname } = req.body;
            const userInfo = {} as UserInfoAttributes;
            const user = {} as UserAttributes;

            if (phone) userInfo['phone'] = phone;
            if (address) userInfo['address'] = address;
            if (country) userInfo['country'] = country;
            userInfo['userid'] = userid;

            if (firstname) user['firstname'] = firstname;
            if (lastname) user['lastname'] = lastname;

            // const data = await UserInfo.update(userInfo, { where: { userid }, returning: true });
            // const userData = await User.update(user, { where: { userid }, returning: true });
            // const updatedUserInfo = data[1][0];
            // const updatedUser = userData[1][0];

            await UserInfo.update(userInfo, { where: { userid } });
            await User.update(user, { where: { userid } });

            res.status(201).json({ message: 'User updated successfully' });
        } catch (error: any) {
            res.status(500).send({
                message:
                    error.message ||
                    'Some error occurred while creating the User.',
            });
        }
    }

    /**
     * get user endpoint
     * @param {Request} req - request object
     * @param {Response} res - response object
     * @returns {Promise<void>} - response object
     */
    static async get(
        req: Request & { user?: any },
        res: Response
    ): Promise<void> {
        try {
            const { id } = req.params;
            const userid = id ? id : req.user.userid; // get user id from params or token
            let data;

            const userData = await User.findOne({
                where: { userid },
                attributes: { exclude: ['password'] },
                include: [
                    {
                        model: UserInfo,
                        as: 'userinfo',
                        attributes: {
                            exclude: ['created_at', 'updated_at', 'userid'],
                        },
                    },
                ],
            });

            // combine user and userinfo data into one object for response
            if (userData && userData.userinfo) {
                const { userinfo, ...userWithoutUserInfo } = userData.toJSON();
                data = { ...userWithoutUserInfo, ...userinfo };
            } else {
                data = userData;
            }

            if (!userData) {
                res.status(404).send({
                    message: 'User Not found.',
                });
                return;
            }

            res.status(200).send(data);
        } catch (error: any) {
            res.status(500).send({
                message:
                    error.message ||
                    'Some error occurred while retrieving User.',
            });
        }
    }

    /**
     * delete user endpoint
     * @param {Request} req - request object
     * @param {Response} res - response object
     * @returns {Promise<void>} - response object
     */
    static async delete(
        req: Request & { user?: any },
        res: Response
    ): Promise<void> {
        try {
            const { id } = req.params;
            const userid = id ? id : req.user.userid; // get user id from params or token

            await UserInfo.destroy({ where: { userid } });
            await User.destroy({ where: { userid } });

            res.status(200).send({
                message: 'User deleted successfully!',
            });
        } catch (error: any) {
            res.status(500).send({
                message:
                    error.message ||
                    'Some error occurred while deleting the User.',
            });
        }
    }

    /**
     * get all users endpoint
     * @param {Request} req - request object
     * @param {Response} res - response object
     * @returns {Promise<void>} - response object
     */
    static async getAll(
        req: Request & { user?: any },
        res: Response
    ): Promise<void> {
        try {
            const userData = await User.findAll({
                attributes: { exclude: ['password'] },
                include: [
                    {
                        model: UserInfo,
                        as: 'userinfo',
                        attributes: {
                            exclude: ['created_at', 'updated_at', 'userid'],
                        },
                    },
                ],
            });

            res.status(200).send(userData);
        } catch (error: any) {
            res.status(500).send({
                message:
                    error.message ||
                    'Some error occurred while retrieving Users.',
            });
        }
    }

    /**
     * deactivate user endpoint
     * @param {Request} req - request object
     * @param {Response} res - response object
     * @returns {Promise<void>} - response object
     */
    static async deactivate(
        req: Request & { user?: any },
        res: Response
    ): Promise<void> {
        try {
            const { id } = req.params;
            const userid = id ? id : req.user.userid; // get user id from params or token

            await User.update({ isActive: false }, { where: { userid } });

            res.status(200).send({
                message: 'User deactivated successfully!',
            });
        } catch (error: any) {
            res.status(500).send({
                message:
                    error.message ||
                    'Some error occurred while deactivating the User.',
            });
        }
    }
}

export default UserController;
