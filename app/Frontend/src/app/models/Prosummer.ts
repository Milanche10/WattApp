import { DeviceDetail } from "./Device"

export interface Prosummer {
    id: string
    firstName: string
    lastName: string
    email: string
    adress: string
    brlk: string
    jbmg: string
    numberOfDevices: number
    devices: DeviceDetail[]
    isBlock: number
}

export interface ProsummerWithHighestUsage{
  email: string
  totalUsage: number
}

export interface ProsummerWithHighestProduced{
  email: string
  totalProduced: number
}

export interface ProsummerPaging {
    prosummerPagingDto: any
    currentPage: number
    numberOfPages: number
    prosummers: Prosummer[]
}

export interface ProsummerFirstTime {
    id: string
    password: string
    brlk: string
    jbmg: string
}

export interface ProsummerExtended {
    id: string
    firstName: string
    lastName: string
    email: string
    adress: string
    brlk: string
    jbmg: string
}

export class ProsummerDetail {

    private _id: string
    private _name: string
    private _email: string
    private _adress: string
    private _brlk: string
    private _jbmg: string


    constructor(
        private prosummer: Prosummer
    ) {
        this._id = prosummer.id
        this._name = prosummer.firstName + " " + prosummer.lastName
        this._email = prosummer.email
        this._adress = prosummer.adress
        this._brlk = prosummer.brlk
        this._jbmg = prosummer.jbmg
    }

    public get id(): string {
        return this._id
    }

    public get jbmg(): string {
        return this._jbmg
    }

    public get name(): string {
        return this._name
    }

    public get email(): string {
        return this._email
    }

    public get adress(): string {
        return this._adress
    }

    public get brlk(): string {
        return this._brlk;
    }
}
