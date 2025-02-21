import sequelize from '../config/db.config';
import Course from './course.model';
import { User, UserInfo } from './entity.model';
import Lesson from './lesson.model';
import Module from './module.model';

const db = {
    User: User.initialize(sequelize),
    UserInfo: UserInfo.initialize(sequelize),
    Module: Module.initialize(sequelize),
    Course: Course.initialize(sequelize),
    Lesson: Lesson.initialize(sequelize),
};

// Set up Associations
Object.values(db).forEach((model: any) => {
    if (model.associate) {
        model.associate(db);
    }
});

export { sequelize, db };
