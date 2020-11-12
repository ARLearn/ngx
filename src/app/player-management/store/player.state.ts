export interface PlayerState {
  selectedPlayer: string;
  list: Player[];
  pendingInvitations: PendingInvitation[];
  pendingInvitationsToMe: PendingInvitation[];
  invitation: Invitation;
  loadingComplete: boolean;
  filter: string[];
  // portalPlayers: Player[];
}

export const playersInitialState: PlayerState = {
  selectedPlayer: null,
  list: [],
  filter: [],
  pendingInvitations: [],
  pendingInvitationsToMe: [],
  invitation: null,
  loadingComplete: false,
  // portalPlayers: []
};


export interface PendingPlayer { //tod call this player
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
  firebaseId?: string;
  email: string;
  familyName?: string;
  fullId: string;
  givenName?: string;
  localId: string;
  name: string;
  picture?: string;
  password?: string;
  error?: string;
  accessRights?: string;
  label?: string;
  isConnection?: boolean;
  advanced?: boolean;
  admin?: boolean;
  expirationDate?: number;

}

export interface Invitation {
  invitationId: string;
  invitedBy?: Player;
}
