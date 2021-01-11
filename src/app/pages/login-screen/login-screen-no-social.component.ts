import {Component, OnInit} from '@angular/core';
import {LoginScreenComponent} from "./login-screen.component";
import {Store} from "@ngrx/store";
import {State} from "../../core/reducers";
import {MatSnackBar} from "@angular/material/snack-bar";
import {GoogleAnalyticsService} from "ngx-google-analytics";

@Component({
    selector: 'app-login-screen-no-social',
    template: `
        <div class="pos-full-canvas a200-color">
            <div class="style-image-left pos-image-left" style="">

            </div>
            <div class="pos-full-canvas-right">
                <div class="pos-login-container a200-color">

                    <div class="pos-app-title primary-color font-bold-32-21-roboto">
                        {{ 'LOGIN.APP_TITLE' | translate }}
                    </div>
                    <div class="pos-subtitle contrast-color-50pct font-regular-17-13-roboto">
                        {{ 'LOGIN.APP_SUB_TITLE' | translate }}
                    </div>

                    <mat-form-field class="pos-email-field font-regular-16-24-roboto ">
                        <input class="contrast-color-50pct"
                               matInput placeholder="{{ 'LOGIN.EMAIL_ADDRESS' | translate }}"
                               [type]="'text'" [(ngModel)]="email">
                    </mat-form-field>

                    <mat-form-field class="pos-password-field  font-regular-16-24-roboto">
                        <input class="contrast-color-50pct"
                               matInput placeholder="{{ 'LOGIN.PASSWORD' | translate }}" [type]="hide ? 'password' : 'text'"
                               [(ngModel)]="pw">
                    </mat-form-field>

                    <div class="pos-option-buttons">
                        <mat-checkbox class="pos-remember-me" color="primary"
                                      [(ngModel)]="rememberMe">
                            <div class="contrast-color-50pct font-regular-16-24-roboto"> {{ 'LOGIN.REMEMBER_ME' | translate }}</div>
                        </mat-checkbox>

                        <button class="pos-forgot-pw"
                                mat-button>
                            <div class="contrast-color-50pct font-regular-16-24-roboto"> {{ 'LOGIN.FORGOT_PASSWORD' | translate }}</div>
                        </button>
                    </div>

                    <button class="pos-login-button gl-style-button-no-shadow font-medium-14-20-roboto"
                            mat-raised-button
                            color="primary" (click)="credentialsLogin()">{{ 'LOGIN.SUBMIT' | translate }}</button>
                </div>
            </div>
        </div>



    `,
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
        / / top: 299 px;
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
            background: transparent url("/assets/img/login/login-image.png");
            background-position: center center;
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
export class LoginScreenNoSocialComponent extends LoginScreenComponent {

    constructor(
        public store: Store<State>,
        public _snackBar: MatSnackBar,
        public gaService: GoogleAnalyticsService
    ) {
        super(store, _snackBar, gaService);
    }


}
