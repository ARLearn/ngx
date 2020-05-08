import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { Observable ,  throwError } from "rxjs";

import { JwtService } from "./jwt.service";
import { catchError } from "rxjs/operators";

@Injectable()
// Taken from https://github.com/gothinkster/angular-realworld-example-app
export class ApiService {
  headers: HttpHeaders;

  constructor(private http: HttpClient, private jwtService: JwtService) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set(
      "Content-Type",
      "application/json; charset=utf-8"
    );
  }

  private formatErrors(error: Response | any) {
    // TODO: Do something with all errors
    return throwError(error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http
      .get(`${environment.api_url}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http
      .put(`${environment.api_url}${path}`, JSON.stringify(body))
      .pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http
      .post(`${environment.api_url}${path}`, body)
      .pipe(catchError(this.formatErrors));
  }

  delete(path): Observable<any> {
    return this.http
      .delete(`${environment.api_url}${path}`)
      .pipe(catchError(this.formatErrors));
  }
}
