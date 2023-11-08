export interface Device {
    id: string
    usage: string
    address: string
    city: string
    country: string
    ownerName: string
    ownerEmail: string
}

export interface DeviceDetail {
    name: string
    id: string
    type: string
    usage: string
    address: string
    city: string
    county: string,
    realEstateId: number,
    status: boolean
    isVisible: boolean
    isAccesable: boolean
    description: string
    manufacturer: string
}

export interface MostlyUsedDevice {
  id: number
  name: string
  type: string
  usage: number
  produced: number
}
