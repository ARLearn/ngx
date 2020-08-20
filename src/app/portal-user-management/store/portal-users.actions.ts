import {Action} from '@ngrx/store';
import {Player} from "../../player-management/store/player.state";


export enum PortalUserActionTypes {
    QUERY = '[PortalUser] Query',
    GET_REQ = '[PortalUser] Get account request',
    UPDATE_ACCOUNT_REQ = '[PortalUser] Update Account',

    ADD_ONE = '[PortalUser] Add One',
    UPDATE_ONE = '[PortalUser] Update One',
    DELETE_ONE = '[PortalUser] Delete One',
    GET_ALL = '[PortalUser] Get All',
    ADD_ALL = '[PortalUser] Add All',
    SELECT_MESSAGE = '[PortalUser] Select Message',
    SELECT_PLAYER = '[PortalUser] Select Player',
}

export class Query implements Action {
    readonly type = PortalUserActionTypes.QUERY;

    constructor(public query: string = null) {
    }

    setFilter(filter: string[]) {
        this.query = filter[0];
    }
}

export class GetAccountRequest implements Action {
    readonly type = PortalUserActionTypes.GET_REQ;

    constructor(public fullId: string = null) {
    }

}

export class UpdateAccountRequest implements Action {
    readonly type = PortalUserActionTypes.UPDATE_ACCOUNT_REQ;

    constructor(public account: Player = null) {
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

export class SelectPlayer implements Action {
    readonly type = PortalUserActionTypes.SELECT_PLAYER;

    constructor(public response: Player) {}
}

export class SelectMessage implements Action {
    readonly type = PortalUserActionTypes.SELECT_MESSAGE;

    constructor() {
    }
}


export type RunResponseActions
    = Query
    | AddOne
    | AddAll
    | UpdateOne
    | DeleteOne
    | GetAll
    | SelectPlayer
    | SelectMessage;
