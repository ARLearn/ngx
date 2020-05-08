import {Component, OnInit} from '@angular/core';
import {getCurrentMessageSelector} from '../../../game-messages/store/game-messages.selector';
import {Store} from '@ngrx/store';
import {State} from '../../../core/reducers';
import {Observable} from 'rxjs';
import {GameMessage} from '../../../game-messages/store/game-messages.state';
import {getEditMessageSelector} from "../../store/game-message.selector";

@Component({
    selector: 'app-screen-editor-navbar',
    template: `
        <div class="pos-header primary-background-color">
            <div class="maxwidth">

                <div class="title">
                    {{(message$ |async)?.name}}
                </div>
                <div class="date">
                    {{'COMMON.LAST_MODIFICATION' | translate}}: {{(message$ |async)?.lastModificationDate | date:'mediumDate'}}
                </div>
                <ng-content></ng-content>

            </div>
        </div>
    `,
    styles: [`
        .pos-header {
            position: relative;
            height: 144px;
            width: 100%;
        }

        .title {
            top: 60px;
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            height: 38px;
            text-align: left;
            font: 400 32px/43px Roboto;
            letter-spacing: 0;
            color: #FFFFFF;
            opacity: 1;
            position: absolute;
        }

        .date {

            top: 108px;
            height: 18px;
            text-align: left;
            font: 300 12px/20px Roboto;
            letter-spacing: 0;
            color: #FFFFFFDE;
            opacity: 0.7;
            position: absolute;
        }

    `]
})
export class ScreenEditorNavbarComponent implements OnInit {

    message$: Observable<GameMessage> = this.store.select(getEditMessageSelector);

    constructor(
        private store: Store<State>
    ) {
    }

    ngOnInit() {
    }

}
