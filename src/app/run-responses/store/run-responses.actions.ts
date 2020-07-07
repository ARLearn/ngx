import {Action} from '@ngrx/store';
import {RunResponse} from './run-responses.state';

export enum RunResponseActionTypes {
    QUERY = '[RunResponse] Query',
    ADD_ONE = '[RunResponse] Add One',
    UPDATE_ONE = '[RunResponse] Update One',
    DELETE_ONE = '[RunResponse] Delete One',
    GET_ALL = '[RunResponse] Get All',
    ADD_ALL = '[RunResponse] Add All',
    SELECT_MESSAGE = '[RunResponse] Select Message'
}

export class Query implements Action {
    readonly type = RunResponseActionTypes.QUERY;

    constructor() {
    }
}

export class AddOne implements Action {
    readonly type = RunResponseActionTypes.ADD_ONE;

    constructor(public response: RunResponse) {
    }
}

export class UpdateOne implements Action {
    readonly type = RunResponseActionTypes.UPDATE_ONE;

    constructor(
        public id: string,
        public changes: Partial<RunResponse>,
    ) {
    }
}

export class DeleteOne implements Action {
    readonly type = RunResponseActionTypes.DELETE_ONE;

    constructor(public id: string) {
    }
}

export class GetAll implements Action {
    readonly type = RunResponseActionTypes.GET_ALL;

    constructor(public responses: RunResponse[]) {
    }
}

export class AddAll implements Action {
    readonly type = RunResponseActionTypes.ADD_ALL;

    constructor(public responsesFromServer: {
        responses: RunResponse[],
        serverTime: number
    }) {
    }
}

export class SelectMessage implements Action {
    readonly type = RunResponseActionTypes.SELECT_MESSAGE;

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
