import { ROLES } from "../utils/enum";

export interface IUser{
    id: string,
    name: string,
    email: string,
    password: string;
    role: ROLES
}