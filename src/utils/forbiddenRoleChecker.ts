import { ForbiddenError } from "../error/Errors";
import { ROLES } from "./enum";

export function forbiddenRoleChecker(role: ROLES){
    if (role !== ROLES.ADMIN) throw new ForbiddenError("Forbidden access");
}