import {PendingPlayer} from '../../player-management/store/player.state';

export interface GameRunsState {
  selectedRun: number;
  runs: GameRun[];
  editRun: GameRun;
  players: PendingPlayer[];
  collaborators: any[];
}

export const gameRunsInitialState: GameRunsState = {
  selectedRun: 0,
  editRun: null,
  runs: [],
  players: [],
  collaborators: [],
};


export interface GameRun {
  runId?: number;
  gameId: number;
  title: string;
  deleted?: boolean;
  startTime?: number;
  serverCreationTime?: number;
  lastModificationDate?: number;
  runConfig: RunConfig;
}

export interface RunConfig {
  selfRegistration?: boolean;
}
