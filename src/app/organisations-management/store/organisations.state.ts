import {EntityState} from "@ngrx/entity";


export interface Organisation {
    name: string;
    id: string;
    expirationDate?: number;
}
