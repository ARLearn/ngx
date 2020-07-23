import {Action} from '@ngrx/store';
import {Player} from "../../player-management/store/player.state";


export enum PortalUserActionTypes {
    QUERY = '[PortalUser] Query',
    ADD_ONE = '[PortalUser] Add One',
    UPDATE_ONE = '[PortalUser] Update One',
    DELETE_ONE = '[PortalUser] Delete One',
    GET_ALL = '[PortalUser] Get All',
    ADD_ALL = '[PortalUser] Add All',
    SELECT_MESSAGE = '[PortalUser] Select Message'
}

export class Query implements Action {
    readonly type = PortalUserActionTypes.QUERY;

    constructor(public query: string = null) {
    }

    setFilter(filter: string[]) {
        this.query = filter[0];
    }
}

export class AddOne implements Action {
    readonly type = PortalUserActionTypes.ADD_ONE;

    constructor(public response: Player) {
    }
}

export class UpdateOne implements Action {
    readonly type = PortalUserActionTypes.UPDATE_ONE;

    constructor(
        public id: string,
        public changes: Partial<Player>,
    ) {
    }
}

export class DeleteOne implements Action {
    readonly type = PortalUserActionTypes.DELETE_ONE;

    constructor(public id: string) {
    }
}

export class GetAll implements Action {
    readonly type = PortalUserActionTypes.GET_ALL;

    constructor(public responses: Player[]) {
    }
}

export class AddAll implements Action {
    readonly type = PortalUserActionTypes.ADD_ALL;

    constructor(public players: Player[]
    ) {
    }
}

export class SelectMessage implements Action {
    readonly type = PortalUserActionTypes.SELECT_MESSAGE;

    constructor() {
    }
}

export type RunResponseActions
    = AddOne
    | AddAll
    | UpdateOne
    | DeleteOne
    | GetAll
    | SelectMessage;
