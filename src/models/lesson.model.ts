// lesson_id (UUID, Primary Key)

import { Model } from "sequelize";
import { LessonAttributes } from "../interface/attributes";
import { Sequelize, DataTypes, UUIDV4 } from "sequelize";
import Module from "./module.model";
// import { Quiz } from "./quiz.model";

class Lesson extends Model<LessonAttributes> {
    public lesson_id!: string;
    public module_id!: string;
    public title!: string;
    public content!: string;
    public video_url?: string;
    public order!: number;

    public static initialize(sequelize: Sequelize) {
        Lesson.init(
            {
                lesson_id: {
                    type: DataTypes.UUID,
                    defaultValue: UUIDV4,
                    primaryKey: true,
                },
                module_id: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                title: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                content: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
                video_url: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                order: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: "Lesson",
                tableName: "lessons",
                timestamps: true,
            }
        );
    }

    public static associate() {
        Lesson.belongsTo(Module, {
            foreignKey: "module_id",
            as: "module",
        });
        // Lesson.hasMany(Quiz, {
        //     foreignKey: "lesson_id",
        //     as: "quizzes",
        // });
    }
}

export default Lesson;