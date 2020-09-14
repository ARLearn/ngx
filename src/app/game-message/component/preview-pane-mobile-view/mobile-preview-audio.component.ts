import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {GameMessage} from "../../../game-messages/store/game-messages.state";
import {getEditMessageSelector, selectedColor} from "../../store/game-message.selector";
import {Store} from "@ngrx/store";
import {State} from "../../../core/reducers";

@Component({
    selector: 'app-mobile-preview-audio',
    template: `

        <app-background-image-selector
                [hideControls]="hideControls"
        >
            <div class="full-with-height-container">
                <app-preview-navbar></app-preview-navbar>
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
export class MobilePreviewAudioComponent implements OnInit {

    @Input() hideControls = false;

    message$: Observable<GameMessage> = this.store.select(getEditMessageSelector);
    selectedColor$: Observable<string> = this.store.select(selectedColor);

    constructor(public store: Store<State>) {
    }

    ngOnInit() {
    }


}
