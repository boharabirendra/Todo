import { ROLES } from "../utils/enum";

export interface IUser{
    id: number,
    name: string,
    email: string,
    password: string;
    roleId: number
}

export interface GetUserQuery{
    q?: string;
    page?: number;
    size?: number;
}