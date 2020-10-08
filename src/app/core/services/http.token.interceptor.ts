import {Observable, throwError as observableThrowError} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {State} from 'src/app/core/reducers';
// import {getAuthToken} from 'src/app/auth/selectors/auth.selector';
import {Router} from '@angular/router';
import {AuthService} from '../../auth/services/auth.service';
import {catchError} from 'rxjs/operators';
import {AngularFireAuth} from "angularfire2/auth";
import {from} from 'rxjs';
import "rxjs-compat/add/operator/first";

// From: github/gothinkster/angular-realworld-example-app?file=src%2Fapp%2Fcore%2Finterceptors%2Fhttp.token.interceptor.ts
@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
    authToken: string = '';

    constructor(private store: Store<State>,
                private router: Router,
                private authService: AuthService,
                public af: AngularFireAuth
    ) {
        // this.store.select(getAuthToken).subscribe((token) =>
        //   this.authToken = token);
    }

    // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //   const headersConfig = {
    //     'Content-Type': 'application/json',
    //     Accept: 'application/json'
    //   };
    //
    //   // console.log("this.auth" , this.authToken)
    //   // if (this.authToken == '') {
    //   //   return next.handle(req);
    //   // }
    //
    //
    //   // const token: string = this.authService.getToken();
    //   // const authReq = req.clone({
    //   //   setHeaders: {Authorization: 'Bearer ' + token},
    //   // });
    //   // return next.handle(authReq);
    //
    //
    //   if (this.authToken == '') {
    //     return next.handle(req);
    //   }
    //   const authReq = req.clone({
    //     setHeaders: {Authorization: 'Bearer ' + this.authToken},
    //   });
    //   return next.handle(authReq);
    // }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.handleAccess(request, next));
    }

    private async handleAccess(request: HttpRequest<any>, next: HttpHandler):
        Promise<HttpEvent<any>> {
        const user = await this.af.authState.first().toPromise();
        if (user == null) {
            return next.handle(request).toPromise();
        }
        const token = await user.getIdToken();
        if (token === '') {
            return next.handle(request).toPromise();
        }
        if (token == null) {
            // console.log("TOKEN IS NOW NULLL !!!!");
        }
        // console.log("token is ", token);
        const authReq = request.clone({
            setHeaders: {Authorization: 'Bearer ' + token},
        });
        return next.handle(authReq).toPromise();
    }
}


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(
            catchError((response: any) => {
                if (response instanceof HttpErrorResponse && response.status === 401) {

                    this.router.navigate(['/login']);

                }
                return observableThrowError(response);
            })
        );

    }
}
