import {Action, select, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {
    AcceptInvitationCompletedAction,
    AcceptInvitationRequestAction,
    AddContactCompletedAction,
    AddContactRequestAction,
    AllPlayersComplete,
    AllPlayersResumeComplete,
    LoadPendingContactsCompletedAction,
    LoadPendingContactsRequestAction,
    LoadPendingContactsToMeCompletedAction,
    LoadPendingContactsToMeRequestAction,
    PlayerActionTypes,
    PlayerLoadCompletedAction,
    PlayerLoadRequestAction,
    ProcessInvitationIdCompletedAction,
    RemoveFriendCompletedAction,
    RemovePendingContactsCompletedAction,
    RemovePendingContactsRequestAction,
    ResendPendingCompletedAction,
    ResendPendingRequestedAction,
    SetInvitationIdCompletedAction, UpdateAccountExpirationCompletedAction, UpdateAccountExpirationRequestAction
} from './player.actions';
import {State} from 'src/app/core/reducers';
import {PlayerService} from '../../core/services/player.service';
import {catchError, filter, map, mergeMap, tap, withLatestFrom} from 'rxjs/operators';
import {SetErrorAction} from '../../shared/store/shared.actions';
import {invitationId} from '../../core/selectors/router.selector';
import {getInvitationId, getLoadingComplete} from './player.selector';
import * as actions from "../../game-management/store/current-game.actions";
import {LoadGameAuthorCompletedAction, LoadGameAuthorRequestAction} from "../../game-management/store/current-game.actions";
import {Game} from "../../game-management/store/current-game.state";
import {PendingPlayer} from "./player.state";
import {AccountService} from "../../core/services/account.service";


@Injectable()
export class PlayerEffects {
    constructor(
        private actions$: Actions,
        private player: PlayerService,
        private accounts: AccountService,
        private store$: Store<State>
    ) {
    }

    @Effect()
    init$: Observable<Action> = this.actions$
        .pipe(
            ofType(PlayerActionTypes.PLAYERS_LOAD_REQUESTED, PlayerActionTypes.PROCESS_INVITATIONID_COMPLETED),
            withLatestFrom(
                this.store$.select(getLoadingComplete)
            ),
            filter(([action, loadingComplete]: [any, boolean]) => !loadingComplete),
            mergeMap(
                ([action, loadingComplete]: [any, boolean]) => {
                    const time = Date.now();
                    return this.player.getContacts(time).pipe(
                        map(res => {
                                const newResult = res;
                                newResult.localTime = time;
                                return new PlayerLoadCompletedAction(
                                    newResult
                                );
                            }
                        ),
                        catchError((error) => {
                            if (error) {
                                return of(new SetErrorAction(error.error));
                            } else {
                                return of(new SetErrorAction({}));
                            }

                        })
                    );
                }
            )
        );

    // @Effect()
    // searchUsers: Observable<Action> = this.actions$
    //     .pipe(
    //         ofType(PlayerActionTypes.SEARCH_USER_REQUESTED),
    //         mergeMap((action: SearchUserRequestAction) => this.accounts
    //             .search(action.payload.query)
    //         ),
    //         map(res =>
    //                 new SearchUserCompletedAction(res),
    //             catchError((error) => {
    //                 return of(new SetErrorAction(error.error));
    //             })
    //         )
    //     );

    @Effect()
    updateExpiration: Observable<Action> = this.actions$
        .pipe(
            ofType(PlayerActionTypes.UPDATE_ACCOUNT_EXP_REQUESTED),
            mergeMap((action: UpdateAccountExpirationRequestAction) => this.accounts
                .updateExpiration(action.payload.fullId, action.payload.expiration, action)
            ),
            map(res =>
                    new UpdateAccountExpirationCompletedAction(res),
                catchError((error) => {
                    return of(new SetErrorAction(error.error));
                })
            )
        );

    @Effect()
    loadPlayers: Observable<Action> = this.actions$.pipe(
        ofType(actions.CurrentGameActionTypes.LOAD_GAME_AUTHORS_COMPLETED),
        mergeMap(
            (action: LoadGameAuthorCompletedAction) => {
                if (!action.payload.gameAccess) {
                    action.payload.gameAccess = [];
                }
                const ids: string = action.payload.gameAccess.map(access => access.account).join(";");
                return this.player.getAccounts(ids).pipe(
                    map(res => {
                            res['connection'] = false;
                            return new AllPlayersComplete(
                                res
                            );
                        }
                    ),
                    catchError((error) => {
                        console.log("in catch error", error);
                        return of(new SetErrorAction(error.error));
                    })
                );
            }
        )
    );

    @Effect()
    resumeLoadingFriends: Observable<Action> = this.actions$
        .pipe(
            ofType(PlayerActionTypes.PLAYERS_LOAD_COMPLETED),
            filter((action: PlayerLoadCompletedAction) =>
                (action.payload.resumptionToken != null
                    && action.payload.accountList != null
                    && action.payload.accountList.length !== 0)
            ),
            mergeMap(
                (action: PlayerLoadCompletedAction) => {
                    return this.player.getContactsWithResumption(action.payload.resumptionToken, action.payload.localTime).pipe(
                        map(res => {
                                const newResult = res;
                                newResult.localTime = action.payload.localTime;
                                return new PlayerLoadCompletedAction(
                                    newResult
                                );
                            }
                        ),
                        catchError((error) => {
                            console.log("in catch error", error);
                            return of(new SetErrorAction(error.error));
                        })
                    );
                }
            )
        );

    @Effect()
    resumeLoadingComplete: Observable<Action> = this.actions$
        .pipe(
            ofType(PlayerActionTypes.PLAYERS_LOAD_COMPLETED),
            filter((action: PlayerLoadCompletedAction) =>
                !(action.payload.resumptionToken != null
                    && action.payload.accountList != null
                    && action.payload.accountList.length !== 0)
            ),
            map(
                (action: PlayerLoadCompletedAction) => {
                    return new AllPlayersResumeComplete();
                }
            )
        );


    @Effect()
    pendinginviations: Observable<Action> = this.actions$
        .pipe(
            ofType(PlayerActionTypes.LOAD_PENDING_REQUESTED, PlayerActionTypes.REMOVE_PENDING_COMPLETED, PlayerActionTypes.ADD_CONTACT_COMPLETED),
            mergeMap(
                (action: LoadPendingContactsRequestAction) =>
                    this.player.getPendingContacts().pipe(
                        map(res =>
                            new LoadPendingContactsCompletedAction(
                                res
                            )
                        ),
                        catchError((error) => {
                            console.log("in catch error", error);
                            return of(new SetErrorAction(error.error));
                        })
                    )
            )
        );

    @Effect()
    pendinginviationsToMe: Observable<Action> = this.actions$
        .pipe(
            ofType(PlayerActionTypes.LOAD_PENDING_TO_ME_REQUESTED),
            mergeMap(
                (action: LoadPendingContactsToMeRequestAction) =>
                    this.player.getPendingContactsToMe().pipe(
                        map(res =>
                            new LoadPendingContactsToMeCompletedAction(
                                res
                            )
                        ),
                        catchError((error) => {
                            console.log("in catch error", error);
                            return of(new SetErrorAction(error.error));
                        })
                    )
            )
        );


    @Effect()
    removePendinginviations: Observable<Action> = this.actions$
        .pipe(
            ofType(PlayerActionTypes.REMOVE_PENDING_REQUESTED),
            mergeMap(
                (action: RemovePendingContactsRequestAction) =>
                    this.player.removePending(action.payload.id).pipe(
                        map(res =>
                            new RemovePendingContactsCompletedAction(
                                action.payload
                            )
                        ),
                        catchError((error) => {
                            console.log("in catch error", error);
                            return of(new SetErrorAction(error.error));
                        })
                    )
            )
        );

    @Effect()
    resendPendinginviations: Observable<Action> = this.actions$
        .pipe(
            ofType(PlayerActionTypes.RESEND_PENDING_REQUESTED),
            mergeMap(
                (action: ResendPendingRequestedAction) =>
                    this.player.redoInvitationId(action.payload.id).pipe(
                        map(res =>
                            new ResendPendingCompletedAction(
                                action.payload
                            )
                        ),
                        catchError((error) => {
                            console.log("in catch error", error);
                            return of(new SetErrorAction(error.error));
                        })
                    )
            )
        );

    @Effect()
    addContact: Observable<Action> = this.actions$
        .pipe(
            ofType(PlayerActionTypes.ADD_CONTACT_REQUESTED),
            map((action: AddContactRequestAction) => action.payload),
            mergeMap(
                (pl: any) =>
                    this.player.addContactContact(pl).pipe(
                        map(res =>
                            new AddContactCompletedAction(
                                res
                            )
                        ),
                        catchError((error) => of(new SetErrorAction(error.error)))
                    )
            )
        )
    ;

    @Effect()
    removeContact: Observable<Action> = this.actions$
        .pipe(
            ofType(PlayerActionTypes.REMOVE_FRIEND_REQUESTED),
            map((action: AddContactRequestAction) => action.payload),
            mergeMap(
                (player: PendingPlayer) =>
                    this.player.removeContact(player).pipe(
                        map(res =>
                            new RemoveFriendCompletedAction(
                                player
                            )
                        ),
                        catchError((error) => of(new SetErrorAction(error.error)))
                    )
            )
        )
    ;

    @Effect()
    setInvitationId: Observable<Action> = this.actions$
        .pipe(
            ofType(PlayerActionTypes.SET_INVITATIONID_REQUESTED),
            withLatestFrom(this.store$.pipe(select(invitationId))),
            mergeMap(
                (all) =>
                    this.player.getAccountForInvitation(all[1])
                        .pipe(map(res => {
                                return {
                                    invitationId: all[1],
                                    invitedBy: res
                                };
                            }
                        ))
            ),
            map(inv => new SetInvitationIdCompletedAction({
                invitation: inv
            }))
        )
    ;

    @Effect()
    processInvitationAfterLogin: Observable<Action> = this.actions$
        .pipe(
            ofType(PlayerActionTypes.ACCEPT_INVITATION_REQUESTED),
            mergeMap(
                (action: AcceptInvitationRequestAction) =>
                    this.player.confirmInvitationId(action.payload.invitationId).pipe(map(x => action.payload))
            ),
            map(all => new AcceptInvitationCompletedAction(all))
        );


}
