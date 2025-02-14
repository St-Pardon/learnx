import dotenv from "dotenv"
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from "./env.config"
import { Dialect, Sequelize } from 'sequelize';

dotenv.config()

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: "postgres" as Dialect,
    logging: false,
    define: {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

export default sequelize;