import { IUser } from "../interface/user";
import { ROLES } from "../utils/enum";

export const users: IUser[] = [
  {
    id: "0",
    name: "BIrendra Bohara",
    email: "birendrabohara2074@gmail.com",
    password: "$2a$10$6vNqMASnomy3KOHOPEezuOcEwts8mbY8pif2Zza.COqY6Uu8X9JTm",
    role: ROLES.ADMIN
  },
];
