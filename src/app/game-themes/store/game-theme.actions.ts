import {Action} from '@ngrx/store';
import {GameTheme} from './game-theme.state';

export enum GameThemeActionTypes {
    QUERY_ONE = '[GameTheme] Query One',
    QUERY = '[GameTheme] Query',
    CREATE_REQUEST = '[GameTheme] Create Request',
    UPDATE_REQUEST = '[GameTheme] Update Request',
    CREATE_REQUEST_SUCCESS = '[GameTheme] Create Request Success',
    ADD_ONE = '[GameTheme] Add One',
    UPDATE_ONE = '[GameTheme] Update One',
    DELETE_ONE = '[GameTheme] Delete One',
    UPDATE_DELETE_ONE = '[GameTheme] Delete One',
    GET_ALL = '[GameTheme] Get All',
    ADD_ALL = '[GameTheme] Add All'
}

export class QueryOne implements Action {
    readonly type = GameThemeActionTypes.QUERY_ONE;

    constructor(public themeId: number) {
    }
}

export class Query implements Action {
    readonly type = GameThemeActionTypes.QUERY;

    constructor() {
    }
}

export class CreateRequest implements Action {
    readonly type = GameThemeActionTypes.CREATE_REQUEST;

    constructor(public payload: GameTheme) {
    }
}

export class UpdateRequest implements Action {
    readonly type = GameThemeActionTypes.UPDATE_REQUEST;

    constructor(public payload: GameTheme) {
    }
}

export class CreateRequestSuccess implements Action {
    readonly type = GameThemeActionTypes.CREATE_REQUEST_SUCCESS;

    constructor(public payload: GameTheme) {
    }
}

export class AddOne implements Action {
    readonly type = GameThemeActionTypes.ADD_ONE;

    constructor(public response: GameTheme) {
    }
}

export class UpdateOne implements Action {
    readonly type = GameThemeActionTypes.UPDATE_ONE;

    constructor(
        public id: string,
        public changes: Partial<GameTheme>,
    ) {
    }
}

export class DeleteOne implements Action {
    readonly type = GameThemeActionTypes.DELETE_ONE;

    constructor(public id: number) {
    }
}

export class UpdateDeleteOne implements Action {
    readonly type = GameThemeActionTypes.UPDATE_DELETE_ONE;

    constructor(public id: number) {
    }
}

export class GetAll implements Action {
    readonly type = GameThemeActionTypes.GET_ALL;

    constructor(public items: GameTheme[]) {
    }
}

export class AddAll implements Action {
    readonly type = GameThemeActionTypes.ADD_ALL;

    constructor(public themes: {
        items: GameTheme[]
    }) {
    }
}

export type GameThemeActions
    = AddOne
    | AddAll
    | UpdateOne
    | DeleteOne
    | UpdateDeleteOne
    | GetAll;
