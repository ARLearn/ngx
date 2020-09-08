import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {act, Actions, Effect, ofType} from '@ngrx/effects';
import {interval, Observable} from 'rxjs';
import {AddAll, Query, GameThemeActionTypes} from './game-theme.actions';
import {
    map,
    mergeMap,
    throttleTime,

} from 'rxjs/operators';
import {State} from "../../core/reducers";
import {GameMessagesService} from 'src/app/core/services/game-messages.service';

import {GameThemeService} from "../../core/services/GameThemeService";


@Injectable()
export class GameThemeEffects {


    @Effect() queryGlobal$: Observable<Action> = this.actions$.pipe(
        ofType(GameThemeActionTypes.QUERY),
        throttleTime(100000),
        mergeMap((action: Query) => {
            return this.gameThemeService.getThemes();
        }),
        map(arr => {
            console.log("arr", arr);
            return new AddAll(arr);
        })
    );

    constructor(private actions$: Actions,
                private store: Store<State>,
                private gameThemeService: GameThemeService,
                private messagesService: GameMessagesService,
    ) {
    }
}
