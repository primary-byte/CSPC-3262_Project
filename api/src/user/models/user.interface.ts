

export interface User {
    id?: number;
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    role?: UserRole;
}


export enum UserRole {
    ADMIN = 'admin',
    MODERATOR = 'moderator',
    BASIC_USER = 'basic_user',
    USER = "USER"
}