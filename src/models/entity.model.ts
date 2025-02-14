import { DataTypes, Model, Sequelize } from 'sequelize';
import { UserAttributes, UserInfoAttributes } from '../interface/attributes';
import bcrypt from 'bcrypt';

class User extends Model<UserAttributes> implements UserAttributes {
    public userid!: string;
    public firstname!: string;
    public lastname!: string;
    public username!: string;
    public email!: string;
    public password!: string;
    public isVerified!: boolean;

    public static initialize(sequelize: Sequelize) {
        User.init(
            {
                userid: {
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
                password: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                isVerified: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false,
                },
            },
            {
                sequelize,
                modelName: 'User',
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
        User.hasOne(models.UserInfo, { foreignKey: 'userid', as: 'userinfo' });
    }

    public async comparePassword(password: string) {
        return await bcrypt.compare(password, this.password);
    }
}

class UserInfo extends Model<UserInfoAttributes> implements UserInfoAttributes {
    public userinfoid!: string;
    public phone!: string;
    public address!: string;
    public country!: string;
    public userid!: string;

    public static initialize(sequelize: Sequelize) {
        UserInfo.init(
            {
                userinfoid: {
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
                userid: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: 'UserInfo',
            }
        );

        return UserInfo;
    }
    public static associate(models: any) {
        UserInfo.belongsTo(models.User, { foreignKey: 'userid', as: 'user' });
    }
}

export { User, UserInfo };
