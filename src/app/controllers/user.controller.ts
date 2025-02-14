import { Response, Request } from "express";
// import { IUser } from "../../interface/attributes";
import { db } from "../../models/index.model";

const { User } = db;


export class UserController {
    // constructor() {
    //     db.sequelize.sync({ force: false })
    //         .then(() => {
    //             console.log('Drop and re-sync db.');
    //         })
    //         .catch((err: any) => {
    //             console.log('Unable to sync database & tables: ', err);
    //         });
    // }

    async createuser(req: Request, res: Response) {
        try {
            if (!User) {
                return res.status(500).send({ message: 'User model is not defined.' });
            }
            const data = await User.create(req.body);
            res.status(201).send(data);
        } catch (error: any) {
            res.status(500).send({
                message: error.message || 'Some error occurred while creating the User.',
            });
        }
    }
}