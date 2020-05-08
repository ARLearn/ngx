import {Action, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import * as selector from 'src/app/core/selectors/router.selector';
import {
    AddUserToRunCompletedAction,
    AddUserToRunRequestAction,
    CreateRunRequestAction,
    DeleteRunCompletedAction,
    DeleteRunRequestAction,
    DeleteUserFromRunCompletedAction,
    DeleteUserFromRunRequestAction,
    GameRunsActionTypes, GetCurrentRunFromRouterRequestAction,
    GetGameRunsCompletedAction,
    GetGameRunsRequestAction,
    LoadRunUsersCompletedAction,
    LoadRunUsersRequestAction, RunSaveResponseAction, SetCurrentRunCompleteAction
} from './game-runs.actions';
import {State} from 'src/app/core/reducers';
import {RunService} from '../../core/services/run.service';
import {catchError, map, switchMap, withLatestFrom, mergeMap, tap} from 'rxjs/operators';
import {SetErrorAction} from '../../shared/store/shared.actions';
import {getCurrentRunId, getEditRunSelector} from './game-runs.selector';
import {GetCurrentGameFromRouterRequestAction} from "../../game-management/store/current-game.actions";
import {GameRun} from "./game-runs.state";
import {Router} from "@angular/router";


@Injectable()
export class GameRunsEffects {
    constructor(
        private actions$: Actions,
        private gameRuns: RunService,
        private store$: Store<State>,
        private router: Router
    ) {
    }

    @Effect()
    getRunFromRouter: Observable<Action> = this.actions$.pipe(
        ofType(GameRunsActionTypes.GET_CURRENT_RUN_FROM_ROUTER_REQUESTED),
        withLatestFrom(
            this.store$.select(selector.currentRunId)
        ),
        switchMap(([action, runId]: [GetCurrentRunFromRouterRequestAction, number]) =>
            this.gameRuns.get(runId).pipe(
                map(res => (new SetCurrentRunCompleteAction(res))),
                catchError((error) => of(new SetErrorAction(error.error)))
            )
        )
    );

    @Effect()
    init$: Observable<Action> = this.actions$.pipe(
        ofType(GameRunsActionTypes.GAME_RUNS_REQUESTED, GameRunsActionTypes.DELETE_RUN_COMPLETED),
        withLatestFrom(
            this.store$.select(selector.currentGameId)
        ),
        switchMap(
            ([action, gameId]: [GetGameRunsRequestAction, number]) =>
                this.gameRuns.listRuns(gameId || action.payload.gameId).pipe(
                    map(res =>
                        new GetGameRunsCompletedAction(
                            {gameId: gameId, items: res}
                        )
                    ),
                    catchError((error) => of(new SetErrorAction(error.error)))
                )
        )
    );

    @Effect()
    createRun: Observable<Action> = this.actions$.pipe(
        ofType(GameRunsActionTypes.CREATE_RUN_REQUESTED),
        withLatestFrom(
            this.store$.select(selector.currentGameId)
        ),
        switchMap(
            ([action, gameId]: [CreateRunRequestAction, number]) =>
                this.gameRuns.createRun(Object.assign(action.payload, {gameId: gameId})).pipe(
                    map(res =>
                        new GetGameRunsRequestAction()
                    ),
                    catchError((error) => of(new SetErrorAction(error.error)))
                )
        )
    );


    @Effect()
    deleteRun: Observable<Action> = this.actions$.pipe(
        ofType(GameRunsActionTypes.DELETE_RUN_REQUESTED),
        switchMap(
            (action: DeleteRunRequestAction) =>
                this.gameRuns.deleteRun(action.payload.runId).pipe(
                    map(res =>
                        new DeleteRunCompletedAction()
                    ),
                    catchError((error) => of(new SetErrorAction(error.error)))
                )
        )
    );

    @Effect()
    addUserToRun: Observable<Action> = this.actions$.pipe(
        ofType(GameRunsActionTypes.ADD_USER_TO_RUN_REQUESTED),
        withLatestFrom(
            this.store$.select(getCurrentRunId)
        ),
        switchMap(
            ([action, runId]: [AddUserToRunRequestAction, number]) =>
                this.gameRuns.addUser(runId, action.payload.fullId).pipe(
                    map(res =>
                        new LoadRunUsersRequestAction()
                    ),
                    catchError((error) => of(new SetErrorAction(error.error)))
                )
        )
    );

    @Effect()
    saveRun: Observable<Action> = this.actions$.pipe(
        ofType(GameRunsActionTypes.RUN_SAVE),
        withLatestFrom(
            this.store$.select(getEditRunSelector)
        ),
        mergeMap(
            ([action, run]: [any, GameRun]) =>
                this.gameRuns.createRun(run).pipe(
                    map(res =>
                        new RunSaveResponseAction(res)
                    )
                )
        ),
        tap((res: any) => {
            this.router.navigate(['/portal/game/' + res.payload.gameId + '/detail/runs']);
        })
    );

    @Effect()
    removeUserFromRun: Observable<Action> = this.actions$.pipe(
        ofType(GameRunsActionTypes.DELETE_USER_FROM_RUN_REQUESTED),

        switchMap(
            (action: DeleteUserFromRunRequestAction) =>
                this.gameRuns.deleteUser(action.payload.runId, action.payload.fullId).pipe(
                    map(res =>
                        new DeleteUserFromRunCompletedAction(action.payload.runId)
                    ),
                    catchError((error) => of(new SetErrorAction(error.error)))
                )
        )
    );

    @Effect()
    getUsersForRun: Observable<Action> = this.actions$.pipe(
        ofType(GameRunsActionTypes.LOAD_RUN_USERS_REQUESTED,
            GameRunsActionTypes.DELETE_USER_FROM_RUN_COMPLETED,
            GameRunsActionTypes.SET_CURRENT_RUN_COMPLETED),
        withLatestFrom(
            this.store$.select(getCurrentRunId)
        ),
        switchMap(
            ([action, runId]: [LoadRunUsersRequestAction, number]) =>
                this.gameRuns.getUsersForRun(runId).pipe(
                    map(res =>
                        new LoadRunUsersCompletedAction(res)
                    ),
                    catchError((error) => of(new SetErrorAction(error.error)))
                )
        )
    );
}
