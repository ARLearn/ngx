import {Action} from '@ngrx/store';
import {Invitation} from './player.state';
import {GameMessagesActionTypes} from "../../game-messages/store/game-messages.actions";
import {PortalUserActionTypes} from "../../user-management/store/portal-user.actions";

export const PlayerActionTypes = {
    SEARCH_USER_REQUESTED: '[PortalUsers] Search User Requested',
    SEARCH_USER_COMPLETED: '[PortalUsers] Search User Completed',

    UPDATE_ACCOUNT_EXP_REQUESTED: '[PortalUsers] Update Account Expiration Requested',
    UPDATE_ACCOUNT_EXP_COMPLETED: '[PortalUsers] Update Account Expiration Completed',


    PLAYERS_LOAD_REQUESTED: '[Players] Load friends Requested',
    PLAYERS_LOAD_COMPLETED: '[Players] Load friends Completed',

    PLAYERS_ALL_COMPLETE: '[Players] Load All Completed',
    PLAYERS_ALL_RESUME_COMPLETE: '[Players] Load All Resume Completed',

    SETFILTER: '[Players] Set connection filter',

    REMOVE_FRIEND_REQUESTED: '[Players] Remove Contacts Requested',
    REMOVE_FRIEND_COMPLETED: '[Players] Remove Contacts Completed',

    LOAD_PENDING_REQUESTED: '[Players] Load Pending Contacts Requested',
    LOAD_PENDING_COMPLETED: '[Players] Load Pending Contacts Completed',

    ACCEPT_INVITATION_REQUESTED: '[Players] Accept Invitation Requested',
    ACCEPT_INVITATION_COMPLETED: '[Players] Accept Invitation Completed',

    RESEND_PENDING_REQUESTED: '[Players] Resend Pending Invitation Requested',
    RESEND_PENDING_COMPLETED: '[Players] Resend Pending Invitation Completed',

    LOAD_PENDING_TO_ME_REQUESTED: '[Players] Load Pending Contacts To Me Requested',
    LOAD_PENDING_TO_ME_COMPLETED: '[Players] Load Pending Contacts To Me Completed',


    REMOVE_PENDING_REQUESTED: '[Players] Remove Pending Contacts Requested',
    REMOVE_PENDING_COMPLETED: '[Players] Remove Pending Contacts Completed',

    SET_INVITATIONID_REQUESTED: '[Players] Set Invitation Id Requested',
    SET_INVITATIONID_COMPLETED: '[Players] Set Invitation Id Completed',

    PROCESS_INVITATIONID_REQUESTED: '[Players] Process Invitation Id Requested',
    PROCESS_INVITATIONID_COMPLETED: '[Players] Process Invitation Id Completed',

    ADD_CONTACT_REQUESTED: '[Players] Add Contact Requested',
    ADD_CONTACT_COMPLETED: '[Players] Add Contact Completed',
};

// export class SearchUserRequestAction implements Action {
//     type = PlayerActionTypes.SEARCH_USER_REQUESTED;
//
//     constructor(public payload: { query: string } = null) {
//     }
// }

export class SearchUserCompletedAction implements Action {
    type = PlayerActionTypes.SEARCH_USER_COMPLETED;

    constructor(public payload: any) {
    }
}
export class UpdateAccountExpirationRequestAction implements Action {
    type = PlayerActionTypes.UPDATE_ACCOUNT_EXP_REQUESTED;

    constructor(public payload: { fullId: string, expiration: number } = null) {
    }
}

export class UpdateAccountExpirationCompletedAction implements Action {
    type = PlayerActionTypes.UPDATE_ACCOUNT_EXP_COMPLETED;

    constructor(public payload: any) {
    }
}

export class SetFilterAction implements Action {
    type = PlayerActionTypes.SETFILTER;

    constructor(public payload: { filters: string[] } = {filters: []}) {
    }

    setFilter(filter: string[]) {
        this.payload.filters = filter;
    }
}

export class RemoveFriendRequestAction implements Action {
    type = PlayerActionTypes.REMOVE_FRIEND_REQUESTED;

    constructor(public payload: any) {
    }
}

export class RemoveFriendCompletedAction implements Action {
    type = PlayerActionTypes.REMOVE_FRIEND_COMPLETED;

    constructor(public payload: any) {
    }
}

export class PlayerLoadRequestAction implements Action {
    type = PlayerActionTypes.PLAYERS_LOAD_REQUESTED;

    constructor(public payload: any = null) {
    }
}

export class PlayerLoadCompletedAction implements Action {
    type = PlayerActionTypes.PLAYERS_LOAD_COMPLETED;

    constructor(public payload: {

        accountList: any[];
        resumptionToken: string;

        localTime: number;
    }) {
    }
}


export class AllPlayersResumeComplete implements Action {
    type = PlayerActionTypes.PLAYERS_ALL_RESUME_COMPLETE;

    constructor(public payload: any = null) {
    }
}

export class AllPlayersComplete implements Action {
    type = PlayerActionTypes.PLAYERS_ALL_COMPLETE;

    constructor(public payload: any = null) {
    }
}


export class LoadPendingContactsRequestAction implements Action {
    type = PlayerActionTypes.LOAD_PENDING_REQUESTED;

    constructor(public payload: any = null) {
    }
}

export class LoadPendingContactsCompletedAction implements Action {
    type = PlayerActionTypes.LOAD_PENDING_COMPLETED;

    constructor(public payload: any) {
    }
}

export class AcceptInvitationRequestAction implements Action {
    type = PlayerActionTypes.ACCEPT_INVITATION_REQUESTED;

    constructor(public payload: {invitationId: string}) {
    }
}

export class AcceptInvitationCompletedAction implements Action {
    type = PlayerActionTypes.ACCEPT_INVITATION_COMPLETED;

    constructor(public payload: any) {
    }
}


export class ResendPendingRequestedAction implements Action {
    type = PlayerActionTypes.RESEND_PENDING_REQUESTED;

    constructor(public payload: {id: string}) {
    }
}

export class ResendPendingCompletedAction implements Action {
    type = PlayerActionTypes.RESEND_PENDING_COMPLETED;

    constructor(public payload: any) {
    }
}

export class LoadPendingContactsToMeRequestAction implements Action {
    type = PlayerActionTypes.LOAD_PENDING_TO_ME_REQUESTED;

    constructor(public payload: any = null) {
    }
}

export class LoadPendingContactsToMeCompletedAction implements Action {
    type = PlayerActionTypes.LOAD_PENDING_TO_ME_COMPLETED;

    constructor(public payload: any) {
    }
}

export class RemovePendingContactsRequestAction implements Action {
    type = PlayerActionTypes.REMOVE_PENDING_REQUESTED;

    constructor(public payload: { id: string }) {
    }
}

export class RemovePendingContactsCompletedAction implements Action {
    type = PlayerActionTypes.REMOVE_PENDING_COMPLETED;

    constructor(public payload: any) {
    }
}

export class SetInvitationIdRequestAction implements Action {
    type = PlayerActionTypes.SET_INVITATIONID_REQUESTED;

    constructor(public payload: { email: string } = null) {
    }
}

export class SetInvitationIdCompletedAction implements Action {
    type = PlayerActionTypes.SET_INVITATIONID_COMPLETED;

    constructor(public payload: { invitation: Invitation }) {
    }
}

export class ProcessInvitationIdRequestAction implements Action {
    type = PlayerActionTypes.PROCESS_INVITATIONID_REQUESTED;

    constructor(public payload: { invitationId: string } = null) {
    }
}

export class ProcessInvitationIdCompletedAction implements Action {
    type = PlayerActionTypes.PROCESS_INVITATIONID_COMPLETED;

    constructor(public payload: any) {
    }
}

export class AddContactRequestAction implements Action {
    type = PlayerActionTypes.ADD_CONTACT_REQUESTED;

    constructor(public payload: { email: string } = null) {
    }
}

export class AddContactCompletedAction implements Action {
    type = PlayerActionTypes.ADD_CONTACT_COMPLETED;

    constructor(public payload: any) {
    }
}

export type PlayerAction
    = PlayerLoadRequestAction
    | PlayerLoadCompletedAction
    | AllPlayersComplete
    | LoadPendingContactsRequestAction
    | LoadPendingContactsCompletedAction
    | LoadPendingContactsToMeRequestAction
    | LoadPendingContactsToMeCompletedAction
    | RemovePendingContactsRequestAction
    | RemovePendingContactsCompletedAction
    | SetInvitationIdRequestAction
    | SetInvitationIdCompletedAction
    | ProcessInvitationIdRequestAction
    | ProcessInvitationIdCompletedAction
    | AddContactRequestAction
    | AddContactCompletedAction
    ;


