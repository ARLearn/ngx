import {Action} from '@ngrx/store';
import {Organisation} from "./organisations.state";
import {Player} from "../../player-management/store/player.state";
import {PortalUserActionTypes} from "../../portal-user-management/store/portal-users.actions";

export enum OrganisationActionTypes {
    QUERY = '[Organisation] Query',
    QUERY_ONE = '[Organisation] Query one',
    ADD_ALL = '[Organisation] Add All',
    ADD_ONE = '[Organisation] Add One',

    CREATE_ORGANISATION = '[Organisation] Create organisation',
    CREATE_ORGANISATION_ERROR = '[Organisation] Create organisation error',

    DELETE_ORGANISATION = '[Organisation] Delete organisation request',
    DELETE_ORGANISATION_RESPONSE = '[Organisation] Delete organisation response',

    UPDATE_ORGANISATION_EXPIRATION = '[Organisation] Update expiration',
    UPDATE_ORGANISATION_EXPIRATION_RESPONSE = '[Organisation] Update expiration response',
}

export class Query implements Action {
    readonly type = OrganisationActionTypes.QUERY;

    constructor(public query: string = null) {}
}


export class QueryOne implements Action {
    readonly type = OrganisationActionTypes.QUERY_ONE;

    constructor(public query: string = null) {}
}


export class AddAll implements Action {
    readonly type = OrganisationActionTypes.ADD_ALL;

    constructor(public organisations: Organisation[]) {}
}

export class AddOne implements Action {
    readonly type = OrganisationActionTypes.ADD_ONE;

    constructor(public organisation: Organisation) {}
}



export class CreateOrganisation implements Action {
    readonly type = OrganisationActionTypes.CREATE_ORGANISATION;

    constructor(public organisation: Organisation = null) {}

}

export class CreateOrganisationError implements Action {
    readonly type = OrganisationActionTypes.CREATE_ORGANISATION_ERROR;

    constructor(public message: string, public organisation: Organisation = null) {}

}

export class DeleteOrganizationRequest implements Action {
    readonly type = OrganisationActionTypes.DELETE_ORGANISATION;

    constructor(public id: string = null) {}
}

export class DeleteOrganizationResponse implements  Action {
    readonly type = OrganisationActionTypes.DELETE_ORGANISATION_RESPONSE;

    constructor(public organisation: Organisation = null) {}
}

export class UpdateOrganisationExpirationAction implements  Action {
    readonly type = OrganisationActionTypes.UPDATE_ORGANISATION_EXPIRATION;

    constructor(public organisation: Partial<Organisation>) {}
}

export type OrganisationActions
    =  AddAll| AddOne |DeleteOrganizationResponse;

