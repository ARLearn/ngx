import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map} from "rxjs/operators";
import {Game} from "../../game-management/store/current-game.state";


@Injectable()
export class GameService {

    constructor(private http: HttpClient) {
    }

    list(cursor: string): Observable<{ games: any[]; resumptionToken: string }> {
        // console.log("in game list");
        let path = '/game/list';
        if (cursor) {
            path += '?resumptionToken=' + cursor;
        }
        return this.http
            .get<any>(environment.api_url + path).pipe(map(gameTrans));

    }

    get(gameId: number): Observable<any> {
        return this.http
            .get<any>(environment.api_url + '/game/' + gameId)
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
            .get<any>(environment.api_url + '/game/access/' + gameId + '/' + fullId + '/'+role);
    }

    revokeAuthors(gameId: number, fullId: string) {
        return this.http
            .get<any>(environment.api_url + '/game/access/revoke/' + gameId + '/' + fullId);
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

let transOneGame = (game: Game) => {
    if (!game.config) {
        game.config = {};

    }
    if (!game.config.primaryColor) {
        game.config.primaryColor = '#D61081';
    }
    if (!game.config.secondaryColor) {
        game.config.secondaryColor = '#3EA3DC';
    }
    return game;

};
