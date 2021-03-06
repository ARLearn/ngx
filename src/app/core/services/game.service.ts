import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map} from "rxjs/operators";
import {Game} from "../../game-management/store/current-game.state";


@Injectable()
export class GameService {

    constructor(private http: HttpClient) {
    }

    list(cursor: string): Observable<{ games: any[]; resumptionToken: string }> {
        let path = '/game/list';
        if (cursor) {
            path += '?resumptionToken=' + cursor;
        }
        return this.http
            .get<any>(environment.api_url + path).pipe(map(gameTrans));

    }

    listParticipate(cursor: string): Observable<{ gameIds: string[]; resumptionToken: string }> {
        let path = '/games/participateWithCursor/-';
        if (cursor != null) {
            path = `/games/participateWithCursor/${cursor}`;
        }
        return this.http
            .get<any>(environment.api_url + path);

    }

    get(gameId: number): Observable<Game> {
        return this.http
            .get<any>(environment.api_url + '/game/' + gameId)
            .pipe(map(transOneGame));
    }

    getPublic(gameId: number): Observable<Game> {
        return this.http
            .get<any>(environment.api_url + '/games/library/game/' + gameId)
            .pipe(map(transOneGame));
    }

    participate(): Observable<any> {
        return this.http
            .get<any>(environment.api_url + '/games/participate');
    }

    participateWithCursor(cursor: String): Observable<any> {
        return this.http
            .get<any>(environment.api_url + '/games/participateWithCursor/' + cursor);
    }

    createGame(game: any): Observable<any> {
        return this.http
            .post<any>(environment.api_url + '/game/create', game);
    }

    updateGame(game: Game): Observable<Game> {
        delete game.endsOn;
        return this.http
            .put<any>(environment.api_url + '/game/' + game.gameId + '/update', game);
    }

    cloneGame(gameId: number): Observable<any> {
        return this.http
            .get<any>(environment.api_url + '/game/clone/' + gameId);
    }

    deleteGame(gameId: number): Observable<any> {
        return this.http
            .delete<any>(environment.api_url + '/game/' + gameId);
    }

    getFeatured(): Observable<any> {
        const lang = 'nl';
        return this.http
            .get<any>(environment.api_url + '/games/featured/' + lang);
    }

    loadAuthors(gameId: number): Observable<any> {
        return this.http
            .get<any>(environment.api_url + '/game/access/' + gameId);
    }

    addAuthors(gameId: number, fullId: string, role: string) {
        return this.http
            .post<any>(environment.api_url + '/game/access/' + gameId + '/' + fullId + '/' + role, {});
    }

    revokeAuthors(gameId: number, fullId: string) {
        return this.http
            .get<any>(environment.api_url + '/game/access/revoke/' + gameId + '/' + fullId);
    }

    saveTheme(gameId: number, themeId: string) {
        console.log('TODO: save theme', gameId, themeId);

        return of(true);
    }

    updateEndState(payload: any, gameId: any) {
        const wrapper = {
            dependencyAsString: JSON.stringify(payload)
        };
        return this.http
            .post<any>(environment.api_url + '/game/endstate/' + gameId, wrapper);
    }
}

let gameTrans = (res: any) => {
    if (!res.games) {
        res.games = [];
    }
    res.games = res.games.map((game) => {
        if (game.lastModificationDate) {
            game.lastModificationDate = Number.parseInt("" + game.lastModificationDate, 10);
        }
        game = transOneGame(game);
        return game;
    });

    return res;
};

const transOneGame = (game: Game) => {
    if (!game.config) {
        game.config = {};

    }
    if (game.lastModificationDate) {
        game.lastModificationDate = Number.parseInt(game.lastModificationDate + '', 10);
    }
    return game;

};
