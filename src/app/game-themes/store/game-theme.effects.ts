import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {act, Actions, Effect, ofType} from '@ngrx/effects';
import {interval, Observable} from 'rxjs';
import {
    AddAll,
    Query,
    GameThemeActionTypes,
    CreateRequest,
    AddOne,
    UpdateOne,
    CreateRequestSuccess, DeleteOne, UpdateDeleteOne, QueryOne
} from './game-theme.actions';
import {
    filter,
    map,
    mergeMap, tap,
    throttleTime, withLatestFrom,

} from 'rxjs/operators';
import {State} from "../../core/reducers";
import {GameMessagesService} from 'src/app/core/services/game-messages.service';

import {GameThemeService} from "../../core/services/GameThemeService";
import {currentUser, getCurrentUser} from "../../auth/store/auth.selector";
import * as fromRoot from "../../core/selectors/router.selector";
import {selectEntities} from './game-theme.selectors';
import {GameTheme} from "./game-theme.state";
import {Dictionary} from "@ngrx/entity";


@Injectable()
export class GameThemeEffects {


    @Effect() queryGlobal$: Observable<Action> = this.actions$.pipe(
        ofType(GameThemeActionTypes.QUERY),
        throttleTime(100000),
        withLatestFrom(this.store.select(getCurrentUser)),
        mergeMap(([action, user]: [Query, any]) => {
            return (user == null) ?
                this.gameThemeService.getGlobalThemes() : this.gameThemeService.getThemes();
        }),
        map(arr => new AddAll(arr))
    );
    @Effect() queryOne: Observable<Action> = this.actions$.pipe(
        ofType(GameThemeActionTypes.QUERY_ONE),
        withLatestFrom(this.store.select(selectEntities)),
        filter(([action, dict]: [QueryOne, Dictionary<GameTheme>]) => {
            return !dict[action.themeId];
        }),
        mergeMap(([action, user]: [QueryOne, any]) => {
            return this.gameThemeService.getTheme(action.themeId);
        }),
        map(arr => new AddAll({items: [arr]}))
    );

    @Effect() create$: Observable<Action> = this.actions$.pipe(
        ofType(GameThemeActionTypes.CREATE_REQUEST),
        mergeMap((action: CreateRequest) => {
            return this.gameThemeService.createTheme(action.payload);
        }),
        map(response => {
            this.store.dispatch(new CreateRequestSuccess(response));
            return new AddOne(response);
        })
    );

    @Effect() update$: Observable<Action> = this.actions$.pipe(
        ofType(GameThemeActionTypes.UPDATE_REQUEST),
        mergeMap((action: CreateRequest) => {
            return this.gameThemeService.createTheme(action.payload);
        }),
        map(response => {
            return new UpdateOne(response.themeId, response);
        })
    );

    @Effect() delete$: Observable<Action> = this.actions$.pipe(
        ofType(GameThemeActionTypes.DELETE_ONE),
        mergeMap((action: DeleteOne) => {
            return this.gameThemeService.deleteTheme(action.id);
        }),
        map(response => {
            return new UpdateDeleteOne(response.themeId);
        })
    );

    constructor(private actions$: Actions,
                private store: Store<State>,
                private gameThemeService: GameThemeService,
                private messagesService: GameMessagesService,
    ) {
    }
}
