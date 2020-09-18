import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {GameRun} from "../../game-runs-management/store/game-runs.state";


const addOptionalData = (run: GameRun) => {
    run.runId = Number.parseInt(run.runId + "", 10);
    if (!run.runConfig) {
        run.runConfig = {};
    }
    if (!run.runConfig.selfRegistration) {
        run.runConfig.selfRegistration = false;
    }
    return run;
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


    listRuns(gameId: string): Observable<GameRun[]> {
        return this.http
            .get<any>(environment.api_url + '/runs/' + gameId + '/list')
            .pipe(
                map(res => res.items ? res.items.map(addOptionalData) : [])
            );
    }

    listMyRuns(gameId: string): Observable<GameRun[]> {
        return this.http
            .get<any>(environment.api_url + '/runs/' + gameId + '/myList')
            .pipe(
                map(res => res.runs ? res.runs.map(addOptionalData) : [])
            );
    }

    createRun(run: any): Observable<GameRun> {
        return this.http
            .post(environment.api_url + '/run/create', run)
            .pipe(map(addOptionalData));
        ;
    }

    addUser(runId: number, userId: string) {
        return this.http
            .get<any>(environment.api_url + '/run/' + runId + '/addUser/' + userId).pipe(map(res => res.items));
    }

    getUsersForRun(runId: number) {
        return this.http
            .get<any>(environment.api_url + '/run/' + runId + '/users').pipe(map(res => res.users));
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
