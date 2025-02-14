export interface UserAttributes {
    userid?: string;
    username?: string;
    email: string;
    password: string;
    isVerified?: boolean;
}

export interface UserInfoAttributes {
    userinfoid: string;
    firstname: string;
    lastname: string;
    phone: string;
    address: string;
    country: string;
    userid: string;
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
