import { ProsummerDTO } from "../ProsummerDTO"
import { PopupDeviceData } from "./PopupDeviceData"
import { PopupType } from "./PopupType"


export class PopupDetails {
    device!: any
    popupType!: PopupType
    header!: String
    text!: String
    confirmText!: String
    confirm!: String
    cancel!: String
    prosumer!:ProsummerDTO
    constructor() {
        
    }
}