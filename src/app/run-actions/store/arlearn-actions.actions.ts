import {Action} from '@ngrx/store';
import {ARLearnAction} from './arlearn-actions.state';

export enum ARLearnActionActionTypes {
    QUERY = '[ARLearnAction] Query',
    ADD_ONE = '[ARLearnAction] Add One',
    UPDATE_ONE = '[ARLearnAction] Update One',
    DELETE_ONE = '[ARLearnAction] Delete One',
    GET_ALL = '[ARLearnAction] Get All',
    ADD_ALL = '[ARLearnAction] Add All'
}

export class Query implements Action {
    readonly type = ARLearnActionActionTypes.QUERY;

    constructor() {
    }
}

export class AddOne implements Action {
    readonly type = ARLearnActionActionTypes.ADD_ONE;

    constructor(public action: ARLearnAction) {
    }
}

export class UpdateOne implements Action {
    readonly type = ARLearnActionActionTypes.UPDATE_ONE;

    constructor(
        public id: string,
        public changes: Partial<ARLearnAction>,
    ) {
    }
}

export class DeleteOne implements Action {
    readonly type = ARLearnActionActionTypes.DELETE_ONE;

    constructor(public id: string) {
    }
}

export class GetAll implements Action {
    readonly type = ARLearnActionActionTypes.GET_ALL;

    constructor(public actions: ARLearnAction[]) {
    }
}

export class AddAll implements Action {
    readonly type = ARLearnActionActionTypes.ADD_ALL;

    constructor(public actionsFromServer: {
        actions: ARLearnAction[],
        serverTime: number
    }) {
    }
}

export type ARLearnActionActions
    = AddOne
    | AddAll
    | UpdateOne
    | DeleteOne
    | GetAll;
