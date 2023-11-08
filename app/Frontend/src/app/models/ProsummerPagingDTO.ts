import { ProsummerDTO } from "./ProsummerDTO";

export class ProsummerPagingDTO {

    prosummers: ProsummerDTO[] = [];    
    public numberOfPages!: number;
    public currentPage!: number;

    
}