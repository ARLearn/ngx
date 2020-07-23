import { Action, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { State } from 'src/app/core/reducers';
import { Observable } from 'rxjs';
import {
    GetGameRequestAction,
    GetGameResponseAction,
    GetTutorialGamesRequestAction,
    GetTutorialGameSuccessAction,
    TutorialActionTypes
} from './tutorial.actions';
import { mergeMap, map, withLatestFrom } from 'rxjs/operators';
import { PortalGamesService } from 'src/app/core/services/portal-games.service';
import * as fromRoot from "../../core/selectors/router.selector";
import {PortalGamesActionTypes} from "../../portal-management/store/portal-games.actions";
import {GameService} from "../../core/services/game.service";
import {GameMessagesService} from "../../core/services/game-messages.service";

@Injectable()
export class TutorialEffects {

    @Effect()
    getPortalGames: Observable<Action> = this.actions$
        .pipe(
            ofType(TutorialActionTypes.GET_FAQ_GAMES),
            mergeMap((action: GetTutorialGamesRequestAction) => this.portalGamesService.get(action.payload)),
            map((games) => new GetTutorialGameSuccessAction(games))
        );

    @Effect()
    getGame: Observable<Action> = this.actions$
        .pipe(
            ofType(TutorialActionTypes.GET_GAME),
            mergeMap((action: GetGameRequestAction) => this.messagesService.listMessages(action.payload)),
            map((games) => new GetGameResponseAction(games))
        );


    constructor(
        private actions$: Actions,
        private store: Store<State>,
        private portalGamesService: GameService,
        private messagesService: GameMessagesService,
    ) {
    }
}
