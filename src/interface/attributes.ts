export interface UserAttributes {
    userid?: string;
    firstname: string;
    lastname: string;
    username?: string;
    email: string;
    password: string;
    role?: "Learner" | "Instructor" | "Admin";
    isVerified?: boolean;
    isActive?: boolean;
    userinfo?: UserInfoAttributes;
}

export interface UserInfoAttributes {
    userinfoid?: string;
    phone?: string;
    address?: string;
    country?: string;
    userid?: string;
}

export interface IUser {
    email: string;
    password: string;
    username?: string;
}

export interface IToken {
    user: IUser;
}

export interface ITokenPayload {
    user: IUser;
}
