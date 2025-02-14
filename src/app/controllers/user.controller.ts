import { Response, Request } from 'express';
// import { IUser } from "../../interface/attributes";
import { db } from '../../models/index.model';
import { User, UserInfo } from '../../models/entity.model';
import { UserAttributes, UserInfoAttributes } from '../../interface/attributes';

export class UserController {
    static async update(req: Request & { user?: any }, res: Response) {
        try {
            const { phone, address, country, firstname, lastname } = req.body;
            const { userid } = req.user;
            const userInfo = {} as UserInfoAttributes;
            const user = {} as UserAttributes;

            if (phone) userInfo['phone'] = phone;
            if (address) userInfo['address'] = address;
            if (country) userInfo['country'] = country;
            userInfo['userid'] = userid;

            if (firstname) user['firstname'] = firstname;
            if (lastname) user['lastname'] = lastname;
            console.log(userInfo, user)
            const data = await UserInfo.update(userInfo, {where: {userid}});
            const userData = await User.update(user, { where: { userid } });

            console.log(data, userData)
            res.status(201).json({...data, ...userData})
        } catch (error: any) {
            res.status(500).send({
                message:
                    error.message ||
                    'Some error occurred while creating the User.',
            });
        }
    }
}

export default UserController;
