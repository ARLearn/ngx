import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map} from "rxjs/operators";

@Injectable()
export class ResponsesService {

    constructor(private http: HttpClient) {
    }

    getResponses(runId: string, from: number, cursor: string): Observable<any> {
        console.log("after response is get");

        if (cursor == null) {
            cursor = '*';
        }
        return this.http
            .get<any>(environment.api_url + `/run/response/runId/${runId}/from/${from}/until/${Date.now()}/cursor/${cursor}`)
            .pipe(
                map(res => {
                    console.log("res is", res);
                    if (res.responses) {
                        res.responses = res.responses.map(responseTransform);

                    } else {
                        res.responses = [];
                    }
                    return res;
                    // return res.responses ?  res.responses.map(responseTransform) : [];
                })
            );
    }


}



const responseTransform = (response: any) => {
    console.log("response is ", response);
    if (response.generalItemId) {
        response.generalItemId = Number.parseInt(response.generalItemId, 10);
    }
    if (response.timeStamp) {
        response.timeStamp = Number.parseInt(response.timeStamp, 10);
    }
    if (response.runId) {
        response.runId = Number.parseInt(response.runId, 10);
    }
    console.log("after response is ", response);
    return response;
};



