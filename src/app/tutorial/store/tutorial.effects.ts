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
import {mergeMap, map, withLatestFrom, filter} from 'rxjs/operators';
import { GameService } from "../../core/services/game.service";
import { GameMessagesService } from "../../core/services/game-messages.service";
import {currentVideoGame, getMessages, getVideoGames} from "./tutorial.selector";
import {Game} from "../../game-management/store/current-game.state";
import {GameMessage} from "../../game-messages/store/types";

@Injectable()
export class TutorialEffects {

    @Effect()
    getPortalGames: Observable<Action> = this.actions$
        .pipe(
            ofType(TutorialActionTypes.GET_FAQ_GAMES),
            mergeMap((action: GetTutorialGamesRequestAction) =>
                this.portalGamesService.get(action.payload.gameId).pipe(
                    map(result => {
                        return {game: result, faq: action.payload.faq};
                    })
                )),
            map((result: { game: any, faq: boolean }) => new GetTutorialGameSuccessAction({game: result.game, faq: result.faq}))
        );

    @Effect()
    getGame: Observable<Action> = this.actions$
        .pipe(
            ofType(TutorialActionTypes.GET_GAME),
            withLatestFrom(
                this.store.select(getMessages),
                this.store.select(currentVideoGame)
            ),
            filter(([action, games, current]: [GetGameRequestAction, GameMessage[], string]) => {
                if (current == 'all') {
                    return games.length === 0;
                }

                return games.every(x => x.gameId !== action.payload);
            }),
            mergeMap(([action]: [GetGameRequestAction, GameMessage[], string]) => this.messagesService.listMessagesWithCursor(action.payload, '*')),
            map((games) => new GetGameResponseAction(games.generalItems))
        );


    constructor(
        private actions$: Actions,
        private store: Store<State>,
        private portalGamesService: GameService,
        private messagesService: GameMessagesService,
    ) {
    }
}
