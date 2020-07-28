import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {GameMessage} from "../../game-messages/store/game-messages.state";
import {map} from "rxjs/operators";
import {Player} from "../../player-management/store/player.state";


@Injectable()
export class AccountService {

    constructor(private http: HttpClient) {
    }

    get(): Observable<any[]> {
        return this.http
            .get<any>(environment.api_url + '/account/accountDetails');
    }

    getWithId(fullId: string): Observable<Player> {
        return this.http
            .get<any>(environment.api_url + '/account/' + fullId);
    }

    recreate(): Observable<any> {
        return this.http
            .get<any>(environment.api_url + '/account/create');
    }

    search(query: string): Observable<Player[]> {

        return this.http
            .get<any>(environment.api_url + '/usermgt/accounts/' + query).pipe(map(result => result.accountList));
    }

    updateExpiration(fullId: string, expiration: number, action: any): Observable<any[]> {
        return this.http
            .get<any>(environment.api_url + `/usermgt/accounts/${fullId}/setExpiration/${expiration}`);
    }

    updateAccount(account: Player): Observable<Player> {
        return this.http
            .post<Player>(environment.api_url + '/account/update', account);
    }

    createAccount(account: Player): Observable<Player> {
        //email
        //password
        //name
        //are mandatory
        //accountType should be 7 (but is ignored)

        return this.http
            .post<Player>(environment.api_url + '/account/create', account);
    }
}

