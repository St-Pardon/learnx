import { DataTypes, Model } from 'sequelize';
import { CourseAttributes } from '../interface/attributes';
import Module from './module.model';
import { User } from './entity.model';

class Course extends Model<CourseAttributes> implements CourseAttributes {
    public course_id!: string;
    public title!: string;
    public description!: string;
    public category!: 'Data' | 'Engineering' | 'Design' | 'Business' | 'Other';
    public level!: 'Beginner' | 'Intermediate' | 'Advanced';
    public created_by!: string;

    public static initialize(sequelize: any) {
        Course.init(
            {
                course_id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                title: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                description: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                category: {
                    type: DataTypes.ENUM(
                        'Data',
                        'Engineering',
                        'Design',
                        'Business',
                        'Other'
                    ),
                    allowNull: false,
                },
                level: {
                    type: DataTypes.ENUM(
                        'Beginner',
                        'Intermediate',
                        'Advanced'
                    ),
                    allowNull: false,
                },
                created_by: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    references: {
                        model: 'users',
                        key: 'user_id',
                    },
                },
            },
            {
                sequelize,
                modelName: 'Course',
                tableName: 'courses',
                timestamps: true,
            }
        );
        return Course;
    }

    public static associate() {
        Course.hasMany(Module, {
            foreignKey: 'course_id',
            as: 'courses',
        });
        Course.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });
    }
}

export default Course;
