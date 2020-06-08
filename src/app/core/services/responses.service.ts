import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable()
export class ResponsesService {

    constructor(private http: HttpClient) {
    }

    getResponses(runId: string, from: number, cursor: string): Observable<any> {
        if (cursor == null) {
            cursor = '*';
        }
        return this.http
            .get<any>(environment.api_url + `/run/response/runId/${runId}/from/${from}/until/${Date.now()}/cursor/${cursor}`);
    }


}
