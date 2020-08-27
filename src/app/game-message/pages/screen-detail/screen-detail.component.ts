import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from '../../../core/reducers';
import {GetGameMessagesRequestAction, SelectMessageFromRouterAction} from '../../../game-messages/store/game-messages.actions';
import {GetCurrentGameFromRouterRequestAction} from '../../../game-management/store/current-game.actions';
import {
    GameMessageEditAction,
    GameMessageEditCompletedAction,
    ResetGameMessageEditAction
} from '../../store/game-message.actions';
import {Observable, Subscription} from "rxjs";
import {GameMessage} from "../../../game-messages/store/types";
import {getEditMessageSelector} from "../../store/game-message.selector";
import {Router} from "@angular/router";
import { tap } from 'rxjs/operators';
import {getGame} from "../../../game-management/store/current-game.selector";

@Component({
    selector: 'app-screen-detail',
    template: `
        <div class="detail-container">
            <app-preview-pane class="pos-preview-pane">
            </app-preview-pane>
            <app-screen-editor-navbar>
                <div class="ext-navbar-left">
                    <div class="back-button">
                        <app-header-back-button
                                (onClicked)="resetEditMessage()"
                                [route]="'/portal/game/'+(message$ |async)?.gameId+'/detail/screens'"
                        >
                        </app-header-back-button>
                    </div>
                </div>
            </app-screen-editor-navbar>

            <div class="proper-max-width ">
                <app-screen-editor class="screen-editor-center"></app-screen-editor>
            </div>
        </div>
    `,
    styles: [`
        .detail-container {
            position: relative;

        }

        @media (max-width: 992px) {
            .proper-max-width {
                margin-left: 0px;
                margin-right: 429px;
                position: relative;
                /*background: #9fd1ee;*/
            }
        }

        @media (min-width: 992px) and (max-width: 1850px) {
            .proper-max-width {
                max-width: 992px;
                margin-left: calc((100% - 992px) / 2);
                margin-right: 429px;
                position: relative;
                /*background: red;*/
            }
        }

        @media (min-width: 1850px) {
            .proper-max-width {
                max-width: 992px;
                margin: auto;
                position: relative;
                /*background: green;*/
            }
        }

        .pos-preview-pane {
            position: fixed;
            right: 0px;
            top: 0px;
            background: #FAFAFA;
            width: 429px;
            height: 100vh;
            z-index: 1;
            box-shadow: 0px 9px 18px #0000002E;
        }

        .back-button {
            position: absolute;
            top: 64px;
            right: 19px;

            /*background: red;*/
        }

        .ext-navbar-left {

            width: 1000px;
            position: absolute;
            left: -1000px;
            height: 144px
        }

    `]
})
export class ScreenDetailComponent implements OnInit {

    message$: Observable<GameMessage> = this.store.select(getEditMessageSelector);
    // subscription: Subscription;

    constructor(
        private store: Store<State>,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.store.dispatch(new GetGameMessagesRequestAction());
        this.store.dispatch(new SelectMessageFromRouterAction());
        this.store.dispatch(new GetCurrentGameFromRouterRequestAction());
        this.store.dispatch(new GameMessageEditAction());
    }

    resetEditMessage() {
        console.log("reset");
        this.store.dispatch(new ResetGameMessageEditAction());
        // //
        // this.subscription = this.message$.subscribe((message) =>
        //     this.router.navigate(['/portal/game/' + message.gameId + '/detail/screens'])
        // )
        // ;
    }

    // ngOnDestroy(): void {
    //     if (this.subscription) {
    //         this.subscription.unsubscribe();
    //     }
    // }
}
