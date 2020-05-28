import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {PendingPlayer} from "../../player-management/store/player.state";


@Injectable()
export class PlayerService {

    constructor(private http: HttpClient) {
    }

    search(query: string): Observable<any[]> {
        return of([
                {
                    type: 'org.celstec.arlearn2.beans.account.Account',
                    localId: 'EfN6',
                    accountType: 7,
                    email: 'jan.jansen@nbdbiblion.nl',
                    name: 'Joke Aquamarijn',
                    givenName: 'Joke',
                    familyName: '',
                    accountLevel: 2,
                    allowTrackLocation: false,
                    fullId: '7:EfN6',
                },
                {
                    type: 'org.celstec.arlearn2.beans.account.Account',
                    localId: '1080',
                    accountType: 2,
                    email: 'test 123@gmail.com',
                    name: 'Boudewijn de Groen',
                    givenName: 'Boudewijn',
                    familyName: '',
                    accountLevel: 2,
                    allowTrackLocation: false,
                    fullId: '2:1080',

                },
                {
                    type: 'org.celstec.arlearn2.beans.account.Account',
                    localId: 'abc16',
                    accountType: 2,
                    email: 'Herman.vzw@gmail.com',
                    name: 'Herman vzw',
                    givenName: 'Herman',
                    familyName: '',
                    accountLevel: 2,
                    allowTrackLocation: false,
                    fullId: '2:abc16',

                }
            ]
        );
        // return this.http
        //     .get<any>(environment.api_url + '/account/accountDetails');
    }

    getContacts(time: number): Observable<any> {
        // console.log("loading contacts");
        return this.http
            .get<any>(environment.api_url + '/player/myContacts' + '/' + time);
    }

    getAccounts(ids: string): Observable<any> {
        return this.http
            .get<any>(environment.api_url + '/accounts/' + ids);
    }

    getContactsWithResumption(resumptionToken: string, time: number): Observable<any> {
        return this.http
            .get<any>(environment.api_url + '/player/myContacts/' + resumptionToken + '/' + time);
    }

    getPendingContacts(): Observable<any[]> {
        return this.http
            .get<any>(environment.api_url + '/player/pendingInvitations');
    }

    getPendingContactsToMe(): Observable<any[]> {
        return this.http
            .get<any>(environment.api_url + '/player/invitationsToMe');
    }

    addContactContact(body: any) {
        return this.http
            .post<any>(environment.api_url + '/player/add', body);
    }

    removeContact(player: PendingPlayer) {
        return this.http
            .get<any>(environment.api_url + '/player/remove/' + player.accountType + "/" + player.localId);
    }

    removePending(id: string) {
        return this.http
            .delete<any>(environment.api_url + '/player/pending/' + id);
    }

    confirmInvitationId(id: string) {
        return this.http
            .get<any>(environment.api_url + '/player/confirmInvitation/' + id);
    }

    denyInvitationId(id: string) {
        return this.http
            .get<any>(environment.api_url + '/player/denyInvitation/' + id);
    }

    redoInvitationId(id: string) {
        return this.http
            .get<any>(environment.api_url + '/player/reinvite/' + id);
    }

    getAccountForInvitation(id: string) {
        return this.http
            .get<any>(environment.api_url + '/player/invitation/' + id);
    }
}
