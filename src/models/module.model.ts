import { DataTypes, Model, Sequelize } from 'sequelize';
import { ModuleAttributes } from '../interface/attributes';
import Lesson from './lesson.model';
import Course from './course.model';

class Module extends Model<ModuleAttributes> {
    public module_id!: string;
    public course_id!: string;
    public title!: string;
    public description!: string;
    public order!: number;

    public static initialize(sequelize: Sequelize) {
        Module.init(
            {
                module_id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                course_id: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                title: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                description: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                },
                order: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: 'Module',
                tableName: 'modules',
                timestamps: true,
            }
        );
        return Module;
    }

    public static associate() {
        Module.belongsTo(Course, {
            foreignKey: 'course_id',
            as: 'course',
        });
        Module.hasMany(Lesson, {
            foreignKey: 'module_id',
            as: 'lessons',
        });
    }
}
export default Module;
