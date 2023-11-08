export interface RegisterParams {
    firstName: string
    lastName: string
    email: string
    password: string
    admin: boolean
    jbmg: string
    brlk: string
    adminPass: string
}

export interface ProsummerRegisterParams {
    firstName: string
    lastName: string
    email: string
    address: string
    city: string
    county: string
    lat: number
    lon: number
    type: string
}
