import { DataTypes, Model, Sequelize } from 'sequelize';
import { UserAttributes, UserInfoAttributes } from '../interface/attributes';
import bcrypt from 'bcrypt';

class User extends Model<UserAttributes> implements UserAttributes {
    public user_id!: string;
    public firstname!: string;
    public lastname!: string;
    public username!: string;
    public email!: string;
    public role!: 'Learner' | 'Instructor' | 'Admin';
    public password!: string;
    public isVerified!: boolean;
    public isActive!: boolean;

    public userinfo?: UserInfo;

    public static initialize(sequelize: Sequelize) {
        User.init(
            {
                user_id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                firstname: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                lastname: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                username: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                role:{
                    type: DataTypes.ENUM('Learner', 'Instructor', 'Admin'),
                    defaultValue: 'Learner',
                    allowNull: false,
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                isVerified: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false,
                },
                isActive: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: true,
                },
            },
            {
                sequelize,
                modelName: 'User',
                tableName: 'users',
                timestamps: true,
            }
        );
        // hash the password before saving the user
        User.beforeCreate(async (user: User) => {
            if (user.password) {
                user.password = await bcrypt.hash(user.password, 10);
            }
        });

        return User;
    }

    public static associate(models: any) {
        User.hasOne(models.UserInfo, { foreignKey: 'user_id', as: 'userinfo' });
    }

    public async comparePassword(password: string) {
        return await bcrypt.compare(password, this.password);
    }
}

class UserInfo extends Model<UserInfoAttributes> implements UserInfoAttributes {
    public info_id!: string;
    public phone!: string;
    public address!: string;
    public country!: string;
    public user_id!: string;

    public static initialize(sequelize: Sequelize) {
        UserInfo.init(
            {
                info_id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                phone: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                address: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                country: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                user_id: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: 'UserInfo',
                tableName: 'userInfo',
                timestamps: true,
            }
        );

        return UserInfo;
    }
    public static associate(models: any) {
        UserInfo.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }
}

export { User, UserInfo };
