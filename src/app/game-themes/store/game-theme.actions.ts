import {Action} from '@ngrx/store';
import {GameTheme} from './game-theme.state';

export enum GameThemeActionTypes {
    QUERY = '[GameTheme] Query',
    ADD_ONE = '[GameTheme] Add One',
    UPDATE_ONE = '[GameTheme] Update One',
    DELETE_ONE = '[GameTheme] Delete One',
    GET_ALL = '[GameTheme] Get All',
    ADD_ALL = '[GameTheme] Add All'
}

export class Query implements Action {
    readonly type = GameThemeActionTypes.QUERY;

    constructor() {
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

    constructor(public id: string) {
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
    | GetAll;
