export interface UserAttributes {
    user_id?: string;
    firstname: string;
    lastname: string;
    username?: string;
    email: string;
    password: string;
    role?: 'Learner' | 'Instructor' | 'Admin';
    isVerified?: boolean;
    isActive?: boolean;
    userinfo?: UserInfoAttributes;
}

export interface UserInfoAttributes {
    info_id?: string;
    phone?: string;
    address?: string;
    country?: string;
    user_id?: string;
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

export interface CourseAttributes {
    course_id?: string;
    course_code: string;
    title: string;
    description?: string;
    category: 'Data' | 'Engineering' | 'Design' | 'Business' | 'Other';
    level?: 'Beginner' | 'Intermediate' | 'Advanced';
    status?: 'Draft' | 'Published' | 'Archived';
    created_by: string;
}

export interface LessonAttributes {
    lesson_id?: string;
    module_id: string;
    title: string;
    content: string;
    video_url?: string;
    order: number;
}

export interface ModuleAttributes {
    module_id?: string;
    course_id: string;
    title: string;
    description: string;
    order: number;
}


export interface EnrollmentAttributes {
    enrollment_id: string;
    course_id: string;
    user_id: string;
    enrolled_on?: Date;
    completed_on?: Date;
    completion_status?: 'Enrolled' | 'Completed' | 'Dropped';
}