import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../../core/reducers";
import {Observable} from "rxjs";
import {getCurrentUser} from "../../store/auth.selector";
import {LogoutRequestedAction} from "../../store/auth.actions";
import {LoadUserRequestAction} from "../../../user-management/store/portal-user.actions";

@Component({
    selector: 'app-user-drop-down-display',
    template: `
        <div class="user-display">
            <button class="display-button" mat-button [matMenuTriggerFor]="menu">
                {{(user$|async).displayName}}
                <mat-icon>arrow_drop_down</mat-icon>
            </button>
            <mat-menu #menu="matMenu" [xPosition]="'before'">
                <div class="display-container">
                    <div class="display-panel-user-metadata">
                        <div class="display-panel-image"
                             [ngStyle]="{'background': 'transparent url('+(user$|async).photoURL+'=w74) 0% 0% no-repeat padding-box'}">
                        </div>
                        <div class="display-panel-user-name font-medium-16-24-roboto color-black-de">{{(user$|async).displayName}}</div>
                        <div class="display-panel-user-email font-regular-14-24-roboto color-black-de">{{(user$|async).email}}</div>
                    </div>
                    <div class="display-panel-line-separator"></div>

                    <div class="display-panel-logout-button color-black-8a font-regular-14-19-roboto ">
                        <button mat-button (click)="logout()">
                            Uitloggen
                        </button>
                    </div>
                </div>


            </mat-menu>
        </div>
    `,
    styles: [`
        .user-display {
            position: relative;
            right: -22px;
            width: 100%;
            display: flex;
            flex-direction: row-reverse;
        }

        button.display-button {
        }

        .display-panel-line-separator {
            position: absolute;
            top: 131px;
            left: 34px;
            width: 272px;
            height: 0px;
            border: 1px solid #DDDDDD;
            opacity: 1;
        }

        .display-panel-logout-button {
            position: absolute;
            top: 187px;
            left: 18px;

        }

        .display-container {
            position: relative;
            width: 340px;
            height: 236px;

        }

        .cdk-overlay-container .mat-menu-panel {
            max-width: 600px;

        }

        .display-panel-user-metadata {
            position: absolute;
            top: 33px;
            left: 34px;
            width: 271px;
            height: 74px;
        }

        .display-panel-user-name {
            position: absolute;
            top: 13px;
            left: 92px;
            width: 179px;
            height: 19px;

            text-align: left;
            
            color: #000000DE;
            opacity: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .display-panel-user-email {
            position: absolute;
            top: 38px;
            left: 92px;
            width: 179px;
            height: 19px;
            text-align: left;
            
            opacity: 0.5;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .display-panel-image {
            position: absolute;
            top: 0px;
            left: 0px;
            width: 74px;
            height: 74px;
            /*background: transparent url('img/0.png') 0% 0% no-repeat padding-box;*/
            border-radius: 200px;
            opacity: 1;

        }
    `],
    encapsulation: ViewEncapsulation.None,

})
export class UserDropDownDisplayComponent implements OnInit {
    displayStyle = {
        'background': "transparent url('https://lh3.googleusercontent.com/a-/AAuE7mAef8ckla4oidgVEstZRNJOYHjnQQ7vKnOQ_jJeGk0=w74') 0% 0% no-repeat padding-box"
    };
    user$: Observable<any> = this.store.select(getCurrentUser);


    constructor(private store: Store<State>
    ) {
    }

    ngOnInit() {
        // this.store.dispatch(new LoadUserRequestAction());
    }

    logout() {
        this.store.dispatch(new LogoutRequestedAction());
    }
}
