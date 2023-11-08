import { RoleEnum } from "./RoleEnum";

export interface Role {
    role: RoleEnum
    isBlock: number
    isFirstTimeLogged: number
}