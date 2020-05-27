export interface PlayerState {
  selectedPlayer: string;
  list: Player[];
  pendingInvitations: PendingInvitation[];
  pendingInvitationsToMe: PendingInvitation[];
  invitation: Invitation;
  loadingComplete: boolean;
  filter: string[];
}

export const playersInitialState: PlayerState = {
  selectedPlayer: null,
  list: [],
  filter: [],
  pendingInvitations: [],
  pendingInvitationsToMe: [],
  invitation: null,
  loadingComplete: false
};


export interface PendingPlayer {
  email: string;
  fullId: string;
  localId: string;
  runId?: number;
  gameId?: number;
  deleted?: boolean;
  accountType?: number;
}

export interface PendingInvitation {
  invitationId: string;
  localId: string;
  accountType: string;
  timestamp: number;

}


export interface Player {
  accountType: number;
  email: string;
  familyName: string;
  fullId: string;
  givenName: string;
  localId: string;
  name: string;
  picture: string;
  error?: string;
  accessRights?: string;
  isConnection: boolean;

}

export interface Invitation {
  invitationId: string;
  invitedBy?: Player;
}
