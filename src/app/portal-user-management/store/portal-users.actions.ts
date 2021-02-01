import {Action} from '@ngrx/store';
import {Player} from "../../player-management/store/player.state";


export enum PortalUserActionTypes {
    QUERY = '[PortalUser] Query',
    QUERY_BY_ORG = '[PortalUser] Query by Organisation',

    GET_REQ = '[PortalUser] Get account request',
    CREATE_ACCOUNT_REQ = '[PortalUser] Create Account',
    UPDATE_ACCOUNT_REQ = '[PortalUser] Update Account',

    DELETE_ACCOUNT_REQ = '[PortalUser] Delete Account request',
    DELETE_ACCOUNT_RES = '[PortalUser] Delete Account response',

    SUSPEND_ACCOUNT_REQ = '[PortalUser] Suspend Account request',
    SUSPEND_ACCOUNT_RES = '[PortalUser] Suspend Account response',

    CREATE_ACCOUNT_SUCCESS = '[PortalUser] Create Account Success',
    CREATE_ACCOUNT_ERROR = '[PortalUser] Create Account Error',

    ADD_ONE = '[PortalUser] Add One',
    UPDATE_ONE = '[PortalUser] Update One',
    DELETE_ONE = '[PortalUser] Delete One',
    GET_ALL = '[PortalUser] Get All',
    ADD_ALL = '[PortalUser] Add All',
    SELECT_MESSAGE = '[PortalUser] Select Message',
    SELECT_PLAYER = '[PortalUser] Select Player',

    SET_ROLE = '[PortalUser] Set Role',
}

export class DeleteAccountRequest implements Action {
    readonly type = PortalUserActionTypes.DELETE_ACCOUNT_REQ;

    constructor(public fullId: string = null) {}
}

export class DeleteAccountResponse implements Action {
    readonly type = PortalUserActionTypes.DELETE_ACCOUNT_RES;

    constructor(public account: Player) {}
}

export class SuspendAccountRequest implements Action {
    readonly type = PortalUserActionTypes.SUSPEND_ACCOUNT_REQ;

    constructor(public fullId: string = null) {}
}

export class SuspendAccountResponse implements Action {
    readonly type = PortalUserActionTypes.SUSPEND_ACCOUNT_RES;

    constructor(public account: Player) {}
}

export class Query implements Action {
    readonly type = PortalUserActionTypes.QUERY;

    constructor(public query: string = null) {}

    setFilter(filter: string[]) {
        this.query = filter[0];
    }
}

export class QueryByOrganisation implements Action {
    readonly type = PortalUserActionTypes.QUERY_BY_ORG;

    constructor(public query: string = null) {}

}

export class GetAccountRequest implements Action {
    readonly type = PortalUserActionTypes.GET_REQ;

    constructor(public fullId: string = null) {}

}

export class CreateAccountRequest implements Action {
    readonly type = PortalUserActionTypes.CREATE_ACCOUNT_REQ;

    constructor(public account: Player = null) {}

}

export class CreateAccountSuccess implements Action {
    readonly type = PortalUserActionTypes.CREATE_ACCOUNT_SUCCESS;

    constructor(public account: Player = null) {}

}

export class CreateAccountError implements Action {
    readonly type = PortalUserActionTypes.CREATE_ACCOUNT_ERROR;

    constructor(public message: string, public account: Player = null) {}
}

export class UpdateAccountRequest implements Action {
    readonly type = PortalUserActionTypes.UPDATE_ACCOUNT_REQ;

    constructor(public account: Player = null) {}

}

export class AddOne implements Action {
    readonly type = PortalUserActionTypes.ADD_ONE;

    constructor(public response: Player) {}
}

export class UpdateOne implements Action {
    readonly type = PortalUserActionTypes.UPDATE_ONE;

    constructor(public id: string, public changes: Partial<Player>) {}
}

export class DeleteOne implements Action {
    readonly type = PortalUserActionTypes.DELETE_ONE;

    constructor(public id: string) {}
}

export class GetAll implements Action {
    readonly type = PortalUserActionTypes.GET_ALL;

    constructor(public responses: Player[]) {}
}

export class AddAll implements Action {
    readonly type = PortalUserActionTypes.ADD_ALL;

    constructor(public players: Player[]) {}
}

export class SelectPlayer implements Action {
    readonly type = PortalUserActionTypes.SELECT_PLAYER;

    constructor(public response: Player) {}
}

export class SelectMessage implements Action {
    readonly type = PortalUserActionTypes.SELECT_MESSAGE;

    constructor() {}
}

export class SetRoleRequest implements Action {
    readonly type = PortalUserActionTypes.SET_ROLE;

    constructor(
        public role: string,
        public isInRole: boolean,
        public fullId: string,
    ) {}
}

export type RunResponseActions
    = Query
    | AddOne
    | AddAll
    | UpdateOne
    | DeleteOne
    | GetAll
    | SelectPlayer
    | SelectMessage
    | DeleteAccountResponse;
