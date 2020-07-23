import {createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromRoot from 'src/app/core/reducers';
import {Player, PlayerState} from './player.state';
import {UserState} from '../../user-management/store/portal-user.state';
// import {GameMessage, GameMessagesState} from "../../game-messages/store/game-messages.state";
// import {getGameMessagesFeature, getMessagesSelector} from "../../game-messages/store/game-messages.selector";

export interface State extends fromRoot.State {
    players: PlayerState;
    user: UserState;
}

export const getPlayersFeature = createFeatureSelector<State, any>('players');
export const _getPortalUserFeature = createFeatureSelector<State, any>('user');

const _user = (state: UserState) => state ? state : {};

const _getAllPlayers = (state: PlayerState) => state.list;
const _getLoadingComplete = (state: PlayerState) => state.loadingComplete;
const _getPendingInvitations = (state: PlayerState) => state.pendingInvitations;
const _getPendingInvitationsToMe = (state: PlayerState) => state.pendingInvitationsToMe;
const _hasPending = (state: PlayerState) => state.pendingInvitations.length !== 0;
const _invitationId = (state: PlayerState) => state.invitation ? state.invitation.invitationId : null;
const _invitationExpired = (state: PlayerState) => state.invitation != null &&
    state.invitation.invitedBy != null &&
    state.invitation.invitedBy.error != null;
const _filtersProjector = (state: PlayerState) => state.filter;
const _invitationBy = (state: PlayerState) => (state.invitation == null || state.invitation.invitedBy == null) ? '...' : state.invitation.invitedBy.name;

export const getAllPlayers = createSelector(getPlayersFeature, _getAllPlayers);

export const getAllPending = createSelector(getPlayersFeature, _getPendingInvitations);
export const getAllPendingToMe = createSelector(getPlayersFeature, _getPendingInvitationsToMe);
export const getFiltersSelector = createSelector(getPlayersFeature, _filtersProjector);


export const hasPending = createSelector(getPlayersFeature, _hasPending);

export const getInvitationId = createSelector(getPlayersFeature, _invitationId);
export const invitationExpired = createSelector(getPlayersFeature, _invitationExpired);
export const invitationBy = createSelector(getPlayersFeature, _invitationBy);
export const getPortalUser = createSelector(_getPortalUserFeature, _user);
export const getLoadingComplete = createSelector(getPlayersFeature, _getLoadingComplete);

export const getConnections = createSelector(getAllPlayers, (list) => list.filter(p => p.isConnection));

export const getAllPlayersAndMySelf = createSelector(getConnections, getPortalUser, (list, me) => {
    if (!list) {
        list = [];
    }
    return !me ? list : [...list, me];
});

export const getFilteredPlayersSelector = createSelector(getConnections, getFiltersSelector,
    (players: Player[], filters: string[]) => {
        return players.filter((player: Player) => {
            if (!filters) {
                return true;
            }
            for (let i = 0; i < filters.length; i++) {
                if (!player.name) {
                    player.name = '';
                }
                if ((player.name.toUpperCase().indexOf(filters[0].toUpperCase()) === -1)
                    &&
                    ((player.email || '').indexOf(filters[0]) === -1)) {
                    return false;
                }
            }
            return true;

        });
    });


// export const getSearchedUsers = createSelector(
//     getPlayersFeature,
//     (players) => players.portalPlayers
// );
