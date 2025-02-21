import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as localStategy } from 'passport-local';
import { User, UserInfo } from '../../models/entity.model';
import {
    ITokenPayload,
    IUser,
    UserAttributes,
} from '../../interface/attributes';
import { JWT_SECRET } from '../../config/env.config';
import { Op } from 'sequelize';
import { sendVerificationEmail } from '../../utils/verification.utils';

passport
    .use(
        new JWTStrategy(
            {
                secretOrKey: JWT_SECRET,
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                ignoreExpiration: false,
                jsonWebTokenOptions: {
                    maxAge: '1d', // 1 day
                },
            },
            async (
                token: ITokenPayload,
                done: (error: any, user?: IUser | false) => void
            ) => {
                try {
                    return done(null, token.user);
                } catch (error) {
                    done(error);
                }
            }
        )
    )
    .use(
        'signup',
        new localStategy(
            {
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true,
            },
            async (
                req,
                email: string,
                password: string,
                done: (error: any, user?: IUser | false, info?: any) => void
            ) => {
                try {
                    const { firstname, lastname, username } = req.body;

                    if (!email || !password || !username) {
                        return done(null, false, {
                            message: 'missing required fields',
                        });
                    }
                    const checkUser = await User.findOne({
                        where: {
                            [Op.or]: [{ email }, { username }],
                        },
                    }); // check if user already exists

                    if (checkUser) {
                        return done(null, false, {
                            message: 'user already exists',
                        });
                    }

                    const user: UserAttributes = await User.create({
                        email,
                        password,
                        username: username,
                        firstname: firstname,
                        lastname: lastname,
                    });

                    const userId = user.user_id;
                    await UserInfo.create({
                        // create user info
                        user_id: userId,
                    });

                    // send email verification
                    await sendVerificationEmail(user);

                    console.log('reached 2');
                    return done(null, user, {
                        message: 'User created successfully',
                    });
                } catch (error) {
                    done(error);
                }
            }
        )
    );

passport.use(
    'login',
    new localStategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (
            email: string,
            password: string,
            done: (error: any, user?: IUser | false, info?: any) => void
        ) => {
            try {
                const user = await User.findOne({ where: { email } });
                if (!user) {
                    return done(null, false, { message: 'User not found' });
                }
                const validate = await user.comparePassword(password);
                if (!validate) {
                    return done(null, false, { message: 'Wrong Password' });
                }
                return done(null, user, { message: 'Logged in Successfully' });
            } catch (error) {
                return done(error);
            }
        }
    )
);
