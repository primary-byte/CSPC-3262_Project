export interface User {
    id?: number;
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    role?: UserRole;
}
export declare enum UserRole {
    ADMIN = "admin",
    MODERATOR = "moderator",
    BASIC_USER = "basic_user"
}
