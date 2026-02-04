export interface LoginRequest{
    email:string;
    password:string;
}

export interface LoginResponse{
    _id:string;
    name:string;
    email:string;
}

export interface RegisterRequest{
    name:string;
    email:string;
    password:string;
    confirmPassword:string;
}

export interface RegisterResponse{
    _id:string;
    name:string;
    email:string;
}