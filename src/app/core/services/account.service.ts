import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {GameMessage} from "../../game-messages/store/game-messages.state";
import {map} from "rxjs/operators";


@Injectable()
export class AccountService {

  constructor(private http: HttpClient) {
  }

  get(): Observable<any[]> {
    return this.http
      .get<any>(environment.api_url + '/account/accountDetails');
  }

  recreate(): Observable<any> {
    return this.http
        .get<any>(environment.api_url + '/account/create');
  }

  search(query: string): Observable<any[]> {
    query = 'test bibliotheek';
    return this.http
        .get<any>(environment.api_url + '/usermgt/accounts/' + query);
  }

  updateExpiration(fullId: string, expiration: number, action:any): Observable<any[]> {
    return this.http
        .get<any>(environment.api_url + `/usermgt/accounts/${fullId}/setExpiration/${expiration}`);
  }
}

