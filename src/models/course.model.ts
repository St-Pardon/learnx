import { DataTypes, Model } from "sequelize";
import { CourseAttributes } from "../interface/attributes";

class Course extends Model<CourseAttributes> implements CourseAttributes {
    public course_id!: string;
    public title!: string;
    public description!: string;
    public category!: "Data" | "Engineering" | "Design" | "Business" | "Other";
    public level!: "Beginner" | "Intermediate" | "Advanced";

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
                    type: DataTypes.ENUM('Data', 'Engineering', 'Design', 'Business', 'Other'),
                    allowNull: false,
                },
                level: {
                    type: DataTypes.ENUM('Beginner', 'Intermediate', 'Advanced'),
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: 'lessons',
            }
        );
        return Course;
    }
    
        
}


export default Course;