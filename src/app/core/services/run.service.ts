import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {GameRun, RunAccess} from "../../game-runs-management/store/game-runs.state";
import {PendingPlayer} from "../../player-management/store/player.state";


const addOptionalRunAccessData = (ra: RunAccess) => {
    ra.timestamp = Number.parseInt(ra.timestamp + "", 10);
    ra.runId = Number.parseInt(ra.runId + "", 10);
    ra.gameId = Number.parseInt(ra.gameId + "", 10);
    return ra;
};

const addOptionalData = (run: GameRun) => {
    run.runId = Number.parseInt(run.runId + "", 10);
    run.gameId = Number.parseInt(run.gameId + "", 10);
    run.lastModificationDate = Number.parseInt(run.lastModificationDate + "", 10);
    run.serverCreationTime = Number.parseInt(run.serverCreationTime + "", 10);
    if (!run.runConfig) {
        run.runConfig = {};
    }
    if (!run.runConfig.selfRegistration) {
        run.runConfig.selfRegistration = false;
    }
    return run;
};

const addUsersData = (player: PendingPlayer) => {
    if (player.runId) {
        player.runId = parseInt('' + player.runId, 10);
    }
    if (player.gameId) {
        player.gameId = parseInt('' + player.gameId, 10);
    }
    return player;
};

const runTrans = (res: any) => {
    if (!res.runs) {
        res.runs = [];
    }
    res.runs = res.runs.map(addOptionalData);
    return res;
};

@Injectable()
export class RunService {

    constructor(private http: HttpClient) {

    }


    get(runId: number): Observable<GameRun> {
        return this.http
            .get<any>(environment.api_url + '/run/' + runId)
            .pipe(map(addOptionalData));
    }

    listRunAccess(gameId: string): Observable<RunAccess[]> {
        return this.http
            .get<any>(environment.api_url + '/run/access/game/' + gameId + '/list')
            .pipe(
                map(res => res.runAccess ? res.runAccess.map(addOptionalRunAccessData) : [])
            );
    }

    getCollaboratorsForRun(runId: string): Observable<RunAccess[]> {
        return this.http
            .get<any>(environment.api_url + '/run/access/' + runId + '/list').pipe(
                map(res => res.runAccess ? res.runAccess.map(addOptionalRunAccessData) : [])
            );
    }

    listRuns(gameId: string): Observable<GameRun[]> {
        return this.http
            .get<any>(environment.api_url + '/runs/' + gameId + '/list')
            .pipe(
                map(res => res.items ? res.items.map(addOptionalData) : [])
            );
    }

    getUsersForRun(runId: number) {
        return this.http
            .get<any>(environment.api_url + '/run/' + runId + '/users').pipe(
                map(res => res.users ? res.users.map(addUsersData) : [])
            );
    }

    listMyRuns(gameId: string, cursor: string): Observable<{ runs: any[]; resumptionToken: string }> {
        let path = '/runs/' + gameId + '/myList';
        if (cursor) {
            path += '?resumptionToken=' + cursor;
        }
        return this.http
            .get<any>(environment.api_url + path)
            .pipe(map(runTrans));
    }

    listMyPlayRuns(gameId: string): Observable<{ runs: any[] }> {
        const path = '/runs/participate/' + gameId;
        return this.http
            .get<any>(environment.api_url + path)
            .pipe(map(runTrans));
    }

    createRun(run: any): Observable<GameRun> {
        return this.http
            .post(environment.api_url + '/run/create', run)
            .pipe(map(addOptionalData));
    }

    addUser(runId: number, userId: string) {
        return this.http
            .get<any>(environment.api_url + '/run/' + runId + '/addUser/' + userId).pipe(map(res => res.items));
    }


    grantCollaboratorAccess(runId: string, fullId: string, rights: string) {
        return this.http
            .post<any>(environment.api_url + '/run/access/' + runId + '/' + fullId + '/' + rights, {});
    }

    revokeCollaboratorAccess(runId: string, fullId: string) {
        return this.http
            .delete<any>(environment.api_url + '/run/access/revoke/' + runId + '/' + fullId);
    }


    deleteUser(runId: number, fullId: string) {
        return this.http
            .delete<any>(environment.api_url + '/run/' + runId + '/user/' + fullId);
    }

    deleteRun(runId: number) {
        return this.http
            .delete<any>(environment.api_url + '/run/delete/' + runId);
    }
}
