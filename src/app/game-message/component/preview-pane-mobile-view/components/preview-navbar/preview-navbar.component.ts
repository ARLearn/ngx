import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {getEditMessageSelector, selectedColor} from "../../../../store/game-message.selector";
import {Store} from "@ngrx/store";
import {State} from "../../../../../core/reducers";
import {GameMessage} from "../../../../../game-messages/store/game-messages.state";

@Component({
    selector: 'app-preview-navbar',
    template: `
        <div
                [ngStyle]="{'background-color': (selectedColor$ |async) }"
                class="pos-navbar">
            <div class="pos-navbar-text font-regular-16-24-roboto">
                {{(message$|async)?.name}}
            </div>
        </div>
    `,
    styles: [`
        .pos-navbar {
            position: absolute;
            width: 100%;
            height: 44px;
            top: 0px;
            z-index: 5;
            text-align: center;
            color: white;
            box-shadow: 0px 3px 4px #0000002E;
        }

        .pos-navbar-text {
            position: relative;
            margin-top: 12px;
        }
    `]
})
export class PreviewNavbarComponent implements OnInit {
    message$: Observable<GameMessage> = this.store.select(getEditMessageSelector);
    selectedColor$: Observable<string> = this.store.select(selectedColor);

    constructor(private store: Store<State>) {
    }

    ngOnInit(): void {
    }

}
