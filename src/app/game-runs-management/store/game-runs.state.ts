import {PendingPlayer} from '../../player-management/store/player.state';
import {PlayerState, RunAccessState, RunState} from "./game-runs.reducer";

export interface GameRunsState {
    selectedRun: number;
    // runs: GameRun[];
    editRun: GameRun;
    // players: PendingPlayer[];
    // collaborators: any[];

    playersNew: PlayerState;
    runsNew: RunState;
    runAccess: RunAccessState;
}


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

export enum RunAccessRight {
    OWNER = 1,
    EDITOR = 2,
    VIEWER = 3
}

export interface RunAccess {
    timestamp: number;
    account: string;
    accessRights: RunAccessRight;
    runId: number;
    gameId: number;
}

// {
//   "type": "org.celstec.arlearn2.beans.run.RunAccess",
//     "timestamp": "1603192596258",
//     "account": "2:116743449349920850150",
//     "accessRights": 2,
//     "runId": "5680391541227520"
// },
