import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {GameMessage} from "../../../game-messages/store/types";
import {getEditMessageSelector} from "../../store/game-message.selector";
import {Store} from "@ngrx/store";
import {State} from "../../../core/reducers";

@Component({
    selector: 'app-preview-pane-header',
    template: `
        <div [ngSwitch]="(message$|async)?.type">
            <app-mc-image-preview-header
                    *ngSwitchCase="'org.celstec.arlearn2.beans.generalItem.MultipleChoiceImageTest'">
            </app-mc-image-preview-header>
            <app-mc-image-preview-header
                    *ngSwitchCase="'org.celstec.arlearn2.beans.generalItem.SingleChoiceImageTest'">
            </app-mc-image-preview-header>

            <app-mc-image-preview-header
                    *ngSwitchCase="'org.celstec.arlearn2.beans.generalItem.MultipleChoiceTest'">
            </app-mc-image-preview-header>
            <app-mc-image-preview-header
                    *ngSwitchCase="'org.celstec.arlearn2.beans.generalItem.SingleChoiceTest'">
            </app-mc-image-preview-header>
            <app-mc-image-preview-header
                    *ngSwitchCase="'org.celstec.arlearn2.beans.generalItem.CombinationLock'">
            </app-mc-image-preview-header>
            <div
                    *ngSwitchDefault="'org.celstec.arlearn2.beans.generalItem.NarratorItem'"
                    class="myDiv primary-background-color">

            </div>
        </div>


    `,
    styles: [`
        .myDiv {
            position: relative;
            height: 65px;
            width: 100%;
            top: 0px;

        }

    `]
})
export class PreviewPaneHeaderComponent implements OnInit {
    message$: Observable<GameMessage> = this.store.select(getEditMessageSelector);

    constructor(
        private store: Store<State>
    ) {
    }

    ngOnInit() {
    }

}
