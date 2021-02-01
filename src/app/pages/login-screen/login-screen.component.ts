import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as actions from 'src/app/auth/store/auth.actions';


import { MatSnackBar } from '@angular/material/snack-bar';
import {Observable} from 'rxjs';
import {getAuthErrorPipe} from '../../auth/store/auth.selector';
import {State} from '../../core/reducers';
import {environment} from "../../../environments/environment";
import {GoogleAnalyticsService} from "ngx-google-analytics";

@Component({
  selector: 'app-login-screen',
  templateUrl: environment.login,
  // templateUrl : 'login-screen.component.html',
  styles: [`

    .pos-full-canvas {
      position: absolute;
      width: 100vw;
      height: 100vh;
    }

    .pos-image-left {
      position: absolute;
      width: 50%;
      height: 100vh;
      left: 0px;
    }

    .pos-full-canvas-right {
      position: absolute;
      width: 50%;
      height: 100vh;
      right: 0px;
    }

    .pos-login-container {
      position: absolute;
      top: 50%;
      left: 0px;
      width: 640px;
      height: 454px;
      transform: translate(0%, -50%);
    }

    .pos-app-title {
      position: relative;
      top: 0px;
      left: 0px;
      width: 640px;
      height: 44px;
      text-align: center;
    }

    .pos-subtitle {
      position: relative;
      margin-top: 12px;
      width: 640px;
      height: 23px;
      text-align: center;
    }

    .pos-email-field {
      position: relative;
      margin-top: 50px;
    //top: 299px;
      left: 98px;
      width: 444px;
      height: 30px;
      opacity: 1;

    }


    .pos-password-field {
      position: relative;
      margin-top: 35px;
      left: 98px;
      width: 444px;
      height: 30px;
    }

    .pos-option-buttons {
      position: relative;
      margin-top: 35px;
      left: 98px;
      width: 444px;
      height: 21px;
    }


    .pos-remember-me {
      position: absolute;
      top: 3px;
      left: 0px;
      width: 78px;
      height: 21px;
      text-align: left;

    }

    .pos-forgot-pw {
      position: absolute;
      top: 0px;
      right: -16px;
      text-align: right;
    }

    .pos-login-button {
      position: relative;
      margin-top: 35px;
      left: 98px;
      width: 444px;
      height: 44px;
    }

    .pos-seperator {
      position: relative;
      margin-top: 35px;
      left: 98px;
      width: 444px;
      height: 19px;
    }


    .pos-stroke-left {
      position: absolute;
      top: 10px;
      left: 0px;
      width: 190px;

    }

    .pos-stroke-right {
      position: absolute;
      top: 10px;
      right: 0px;
      width: 190px;
    }

    .pos-divider-of {
      position: absolute;
      top: 0px;
      left: 50%;
      transform: translate(-50%, 0%);
      height: 19px;
    }

    .pos-social-login-buttons {
      position: relative;
      margin-top: 35px;
      left: 98px;
      width: 444px;
      height: 44px;
    }


    .pos-google-button {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 205px;
      height: 44px;
    }

    .pos-facebook-button {
      position: absolute;
      top: 0px;
      right: 0px;
      width: 205px;
      height: 44px;
    }


    .pos-login-button-text {
      position: absolute;
      right: 0px;
      top: 11px;
      width: 160px;
      text-align: center;
    }

    .pos-icon-in-button {
      position: absolute;
      left: 25px;
      top: 3px;
      opacity: 1;
      width: 18px;
      height: 18px;
    }

    .style-image-left {
      background: transparent url("/assets/img/login/login-image.png") 0% 0% no-repeat padding-box;
      background-size: cover;
      border-width: 1px;
    }

    .style-stroke {
      height: 1px;
      background: #000000 0% 0%;
      opacity: 0.12;
    }

  `]
})
export class LoginScreenComponent implements OnInit {
  hide = true;
  email = '';
  pw = '';
  rememberMe = true;
  error$: Observable<string> ;

  constructor(
    public store: Store<State>,
    public _snackBar: MatSnackBar,
    public gaService: GoogleAnalyticsService

  ) {
  }

  ngOnInit() {
    this.error$ = this.store.pipe(getAuthErrorPipe);
    this.error$.subscribe(error => {
      if (error != null) {
        this._snackBar.open(error, null, {
          duration: 2000,
        });
      }
    });
  }

  googleLogin() {
    if (environment.gatracking !== '') {
      this.gaService.event('LOGIN');
    }
    this.store.dispatch(
      new actions.GoogleLoginRequestedAction()
    );
  }

  facebookLogin() {
  }


  credentialsLogin() {
    this.store.dispatch(
      new actions.LoginRequestedAction({
        user: {email: this.email, password: this.pw},
        rememberMe: this.rememberMe
      })
    );
  }

}
