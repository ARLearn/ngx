import * as actions from './player.actions';
import {PendingInvitation, playersInitialState, PlayerState} from './player.state';
import * as _ from 'lodash';
import {AuthActionTypes} from "../../auth/store/auth.actions";

export function reducers(
    state = playersInitialState, action: actions.PlayerAction): PlayerState {
    switch (action.type) {

        case AuthActionTypes.LOGIN_COMPLETED: {
            return Object.assign({}, playersInitialState);
        }

        case AuthActionTypes.LOGOUT_REQUESTED: {
            return Object.assign({}, playersInitialState);
        }

        case actions.PlayerActionTypes.PLAYERS_LOAD_COMPLETED: {
            if (!action.payload.accountList) {
                return state;
            }
            action.payload.accountList = action.payload.accountList.map(account => account.name != null ? account: Object.assign(account, {name: account.email}));
            action.payload.accountList = action.payload.accountList.map(account => Object.assign(account, {isConnection: true}));
            return Object.assign({}, state, {
                list: _.uniqBy([...action.payload.accountList, ...state.list], function (e) {
                    return e.fullId;
                })
            });
        }

        case actions.PlayerActionTypes.LOAD_PENDING_COMPLETED: {
            return Object.assign({}, state,
                {
                    pendingInvitations: action.payload.accountList ? action.payload.accountList : []
                }
            );
        }

        case actions.PlayerActionTypes.PLAYERS_ALL_RESUME_COMPLETE: {
            return Object.assign({}, state,
                {
                    loadingComplete: true
                }
            );
        }
        case actions.PlayerActionTypes.PLAYERS_ALL_COMPLETE: {

            if (!action.payload.accountList) {
                return state;
            }
            const isConnection = !!action.payload['connection'];
            action.payload.accountList = action.payload.accountList.map(account => Object.assign(account, {isConnection: isConnection}));

            return Object.assign({}, state,
                {
                    list: _.unionBy(state.list, action.payload.accountList, "fullId")
                }
            );
        }
        case actions.PlayerActionTypes.LOAD_PENDING_TO_ME_COMPLETED: {
            return Object.assign({}, state,
                {pendingInvitationsToMe: action.payload.invitationList}
            );
        }

        case actions.PlayerActionTypes.SET_INVITATIONID_COMPLETED: {
            return Object.assign({}, state, action.payload);
        }

        case actions.PlayerActionTypes.PROCESS_INVITATIONID_COMPLETED: {
            const newState = state;
            newState.invitation = undefined;
            return Object.assign({}, newState);
        }

        case actions.PlayerActionTypes.SETFILTER: {
            return Object.assign({}, state, {filter: action.payload.filters});
        }

        case actions.PlayerActionTypes.REMOVE_FRIEND_COMPLETED: {

            state.list = [...state.list.filter(player => player.localId !== action.payload.localId)];
            return Object.assign({}, state);
        }

        case actions.PlayerActionTypes.ACCEPT_INVITATION_COMPLETED: {
            state.pendingInvitationsToMe = [
                ...state.pendingInvitationsToMe.filter(
                    (inv: PendingInvitation) => inv.invitationId !== action.payload.invitationId
                )
            ];
            return Object.assign({}, state);
        }

        case actions.PlayerActionTypes.REMOVE_PENDING_COMPLETED: {
            if (state.pendingInvitations) {
                state.pendingInvitations = [
                    ...state.pendingInvitations.filter(
                        (inv: PendingInvitation) => inv.invitationId !== action.payload.id
                    )
                ];
                return Object.assign({}, state);
            }
            return state;

        }

        case actions.PlayerActionTypes.RESEND_PENDING_REQUESTED: {
            state.list = [...state.list.map(
                player => player.localId === action.payload.localId ?
                    Object.assign(player, {resend: true})
                    :
                    player
            )];
            return Object.assign({}, state);
        }

        case actions.PlayerActionTypes.RESEND_PENDING_COMPLETED: {
            state.list = [...state.list.map(
                player => player.localId === action.payload.localId ?
                    Object.assign(player, {resend: false})
                    :
                    player
            )];
            return Object.assign({}, state);
        }

        case AuthActionTypes.LOGOUT_REQUESTED : {
            return playersInitialState;
        }

        case actions.PlayerActionTypes.SEARCH_USER_COMPLETED: {
            return Object.assign({}, state, {
                portalPlayers: action.payload
            });
        }

        default: {
            return state;
        }
    }
}
