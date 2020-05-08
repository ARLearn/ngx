import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {GameMessage} from "../../../../game-messages/store/game-messages.state";
import {getEditMessageSelector, selectedColor} from "../../../store/game-message.selector";
import {Store} from "@ngrx/store";
import {State} from "../../../../core/reducers";
import {GameMessageUpdateAction} from "../../../store/game-message.actions";

@Component({
    selector: 'app-mobile-preview-narrator',
    template: `

        <app-background-image-selector>
            <div class="full-with-height-container">
                <app-preview-navbar></app-preview-navbar>
                <div class="text-box-preview">
                    <div class="text-preview font-regular-16-24-roboto">
                        {{(message$|async)?.richText}}
                    </div>
                    <button
                            class="gl-pos-button-right pos-button"
                            [ngStyle]="{'background-color': (selectedColor$ |async) }"
                            mat-raised-button>{{(message$|async)?.description}}</button>
                </div>

            </div>
        </app-background-image-selector>
    `,
    styles: [`
        .text-preview {
            margin: 24px;
            margin-top: 24px;

            text-align: left;
            color: #0000008A;
        }

        .pos-button {
            right: 5px;
            bottom: -10px;
            color: white;
        }
    `]
})
export class MobilePreviewNarratorComponent implements OnInit {

    message$: Observable<GameMessage> = this.store.select(getEditMessageSelector);
    selectedColor$: Observable<string> = this.store.select(selectedColor);

    constructor(public store: Store<State>) {
    }

    ngOnInit() {
    }


}
