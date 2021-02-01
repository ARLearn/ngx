import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {GameMessage} from "../../game-messages/store/game-messages.state";
import {map} from "rxjs/operators";
import {Player} from "../../player-management/store/player.state";
import {Organisation} from "../../organisations-management/store/organisations.state";


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
            .get<any>(environment.api_url + '/account/' + fullId)
            .pipe(map(account => this.populateAccount(account)));
    }

    recreate(): Observable<any> {
        return this.http
            .get<any>(environment.api_url + '/account/create');
    }

    search(query: string): Observable<Player[]> {

        return this.http
            .get<any>(environment.api_url + '/usermgt/accounts/' + query)
            .pipe(
                map(result => result.accountList),
                map(accounts => accounts && accounts.map(account => this.populateAccount(account)))
            );
    }

    searchByOrganisation(organisationId: string): Observable<Player[]> {
        return this.http
            .get<any>(environment.api_url + '/account/organisation/' + organisationId + "/list")
            .pipe(
                map(result => result.accountList),
                map(accounts => accounts && accounts.map(account => this.populateAccount(account)))
            );
    }

    updateExpiration(fullId: string, expiration: number, action: any): Observable<any[]> {
        return this.http
            .post<any>(environment.api_url + `/account/${fullId}/expiration/${expiration}`, null);
    }

    updateOrganisation(fullId: string, organisation: string): Observable<any[]> {
        return this.http
            .post<any>(environment.api_url + `/account/${fullId}/organisation/${organisation}`, null);
    }

    updateAccount(account: Player): Observable<Player> {
        return this.http
            .post<Player>(environment.api_url + '/account/update', account)
            .pipe(map(acc => this.populateAccount(acc)));
    }

    createAccount(account: Player): Observable<Player> {
        //email
        //password
        //name
        //are mandatory
        //accountType should be 7 (but is ignored)

        return this.http
            .post<Player>(environment.api_url + '/account/create', account)
            .pipe(map(account => this.populateAccount(account)));
    }


    private populateAccount(account) {
        return account && {
            ...account,
            labels: account.label && account.label.split(';'),
        };
    }

    deleteAccount(fullId: string): Observable<Player> {
        return this.http
            .delete<Player>(environment.api_url + '/account/' + fullId);
    }

    setRole(fullId: string, role: string, isInRole: boolean): Observable<Player> {
        return this.http
            .post<Player>(environment.api_url + '/account/' + fullId + '/' + role + '/' + isInRole, {});
    }

    createOrganisation(organisation: Organisation): Observable<Organisation> {
        return this.http
            .post<Organisation>(environment.api_url + '/organization/create', organisation);
    }

    listOrganizations(): Observable<Organisation[]> {
        return this.http
            .get<any>(environment.api_url + '/organization/list').pipe(
                map(resp => {
                    return resp.items || [];
                })
            );
    }

    deleteOrganisation(id: string): Observable<Organisation> {
        return this.http
            .delete<Organisation>(environment.api_url + '/organization/' + id);
    }

    getOrganization(organisationId: string): Observable<Organisation> {
        return this.http
            .get<Organisation>(environment.api_url + '/organization/' + organisationId);
    }


}

