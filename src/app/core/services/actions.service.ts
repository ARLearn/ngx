import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable()
export class ActionsService {

    constructor(private http: HttpClient) {
    }



    getActions(runId: number, from: number, cursor: string): Observable<any> {
        if (cursor == null) {
            cursor = '*';
        }
        return this.http
            .get<any>(environment.api_url + `/actions/run/${runId}/from/${from}/${cursor}`);
    }


}
