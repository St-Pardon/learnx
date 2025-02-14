import sequelize from '../config/db.config';
import { User, UserInfo } from './entity.model';

const db = {
    User: User.initialize(sequelize),
    UserInfo: UserInfo.initialize(sequelize),
};

// Set up Associations
Object.values(db).forEach((model: any) => {
    if (model.associate) {
        model.associate(db);
    }
});

export { sequelize, db };
