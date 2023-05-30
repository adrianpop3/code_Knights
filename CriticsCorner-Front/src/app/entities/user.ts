export interface User {
    id: number | undefined;
    username: string;
    password: string;
    confirmpassword: string
    email: string;
    roles: string[];
}
