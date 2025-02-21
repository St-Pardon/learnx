import { DataTypes, Model } from 'sequelize';
import { User } from './entity.model';
import Course from './course.model';
import { EnrollmentAttributes } from '../interface/attributes';

class Enrollment
    extends Model<EnrollmentAttributes>
    implements EnrollmentAttributes
{
    public enrollment_id!: string;
    public user_id!: string;
    public course_id!: string;
    public enrolled_on!: Date;
    public completed_on?: Date | undefined;
    public completion_status!: 'Enrolled' | 'Completed' | 'Dropped';

    public static initialize(sequelize: any) {
        Enrollment.init(
            {
                enrollment_id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                user_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'users',
                        key: 'user_id',
                    },
                },
                course_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'courses',
                        key: 'course_id',
                    },
                },
                enrolled_on: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: new Date(),
                },
                completed_on: {
                    type: DataTypes.DATE,
                    allowNull: true,
                },
                completion_status: {
                    type: DataTypes.ENUM('Enrolled', 'Completed', 'Dropped'),
                    allowNull: false,
                    defaultValue: 'Enrolled',
                },
            },
            {
                sequelize,
                modelName: 'Enrollment',
                tableName: 'enrollments',
                timestamps: false,
            }
        );
        return Enrollment;
    }

    public static associate() {
        Enrollment.belongsTo(User, {
            foreignKey: 'user_id',
            as: 'user',
        });
        Enrollment.belongsTo(Course, {
            foreignKey: 'course_id',
            as: 'course',
        });
    }
}


export default Enrollment;