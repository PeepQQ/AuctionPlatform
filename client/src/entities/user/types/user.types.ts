


export interface User {
    id: number;
    email: string;
    name: string;
}

export interface SignInData {
    email: string;
    password: string;
}

export interface SignUpData {
    name: string;
    email: string;
    password: string;
}