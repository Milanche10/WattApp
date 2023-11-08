import { Injectable } from "@angular/core";
import { Prosummer } from "src/app/models/Prosummer";
import { RoleEnum } from "src/app/models/RoleEnum";
import { User } from "src/app/models/User";

export class Global {
    public static isAdmin: boolean
    public static isProssumer: boolean
    public static modalHeader: string = ""
    public static user?: User
    public static DsoDashboardNumberOfPages:Array<number> = []
    public static maxProsummersPerPage = 6;
    
}

@Injectable({
    providedIn: 'root'
  })
export class RoleRedirect {
    static redirectToHome(role: RoleEnum){
        if(RoleEnum.Admin == role) {
            return 'dso/home'
          } else if(RoleEnum.Prosummer == role) {
            return 'prosummer/home'
          }
          return null
    }

    static redirectTo(role: number, page: string) {
        if(RoleEnum[role] == RoleEnum[RoleEnum.Admin]) {
            return 'dso/'+page
        } else if(RoleEnum[role] == RoleEnum[RoleEnum.Prosummer]) {
            return 'prosummer/'+page
        }
        return null
    }
}

export interface ModalData {
    data: any,
    modalType: ModalTypes
}

export enum ModalTypes {
    PROSSUMER_DETAILS = 0,
    DEVICE_DETAILS = 1,
    DSO_PROSUMMER_CREATION = 2
}