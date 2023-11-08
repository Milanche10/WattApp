import { RealEstate } from "./RealEstate";

export interface RealEstateResponse {
    result: RealEstate[];
    id: number;
    exception: any;
    status: number;
    isCanceled: boolean;
    asyncState: any;
    creationOptions: number;
    isCompleted: boolean;
    isCompletedSuccessfully: boolean;
    isFaulted: boolean;
  }