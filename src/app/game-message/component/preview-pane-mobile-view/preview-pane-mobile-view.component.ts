import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {GameMessage} from "../../../game-messages/store/game-messages.state";
import {aggregatePreviewSelector, getEditMessageSelector, selectedColor} from "../../store/game-message.selector";
import {Store} from "@ngrx/store";
import {State} from "../../../core/reducers";

@Component({
    selector: 'app-preview-pane-mobile-view',
    template: `
        <div class="preview-outer-pane">

            <div class="preview-pane">
                <div [ngSwitch]="(message$|async)?.type">
                    <app-mobile-preview-narrator
                            *ngSwitchCase="'org.celstec.arlearn2.beans.generalItem.NarratorItem'">
                    </app-mobile-preview-narrator>
                    <app-mobile-preview-narrator
                            *ngSwitchCase="'org.celstec.arlearn2.beans.generalItem.PictureQuestion'">
                    </app-mobile-preview-narrator>
                    <app-mobile-preview-narrator
                            *ngSwitchCase="'org.celstec.arlearn2.beans.generalItem.AudioQuestion'">
                    </app-mobile-preview-narrator>
                    <app-mobile-preview-scan-tag
                            *ngSwitchCase="'org.celstec.arlearn2.beans.generalItem.ScanTag'">
                    </app-mobile-preview-scan-tag>
                    <app-mobile-preview-video
                            *ngSwitchCase="'org.celstec.arlearn2.beans.generalItem.VideoObject'">
                    </app-mobile-preview-video>
                    
                    <div *ngSwitchCase="'org.celstec.arlearn2.beans.generalItem.SingleChoiceTest'">
                        <app-mobile-preview-answer-feedback
                                [answer]="(aggregatePreviewSelector$|async).data"
                                *ngIf="(aggregatePreviewSelector$|async).ptype === 'answer'"
                        ></app-mobile-preview-answer-feedback>
                        <app-mobile-preview-single-choice
                                *ngIf="(aggregatePreviewSelector$|async).ptype !== 'answer'"
                        >
                        </app-mobile-preview-single-choice>
                    </div>
                    <div *ngSwitchCase="'org.celstec.arlearn2.beans.generalItem.MultipleChoiceTest'">
                        <app-mobile-preview-answer-feedback
                                [answer]="(aggregatePreviewSelector$|async).data"
                                *ngIf="(aggregatePreviewSelector$|async).ptype === 'answer'"
                        ></app-mobile-preview-answer-feedback>
                        <app-mobile-preview-multiple-choice
                                *ngIf="(aggregatePreviewSelector$|async).ptype !== 'answer'"
                        >
                        </app-mobile-preview-multiple-choice>
                    </div>
                    <div *ngSwitchCase="'org.celstec.arlearn2.beans.generalItem.MultipleChoiceImageTest'">
                        <app-mobile-preview-answer-feedback
                                [answer]="(aggregatePreviewSelector$|async).data"
                                *ngIf="(aggregatePreviewSelector$|async).ptype === 'answer'"
                        ></app-mobile-preview-answer-feedback>
                        <app-mobile-preview-multiple-choice-image
                                *ngIf="(aggregatePreviewSelector$|async).ptype !== 'answer'">
                        </app-mobile-preview-multiple-choice-image>
                    </div>
                    <div *ngSwitchCase="'org.celstec.arlearn2.beans.generalItem.SingleChoiceImageTest'">
                        <app-mobile-preview-answer-feedback
                                [answer]="(aggregatePreviewSelector$|async).data"
                                *ngIf="(aggregatePreviewSelector$|async).ptype === 'answer'"
                        ></app-mobile-preview-answer-feedback>
                        <app-mobile-preview-multiple-choice-image
                                *ngIf="(aggregatePreviewSelector$|async).ptype !== 'answer'">
                        </app-mobile-preview-multiple-choice-image>
                    </div>
                </div>
            </div>
        </div>

    `,
    styles: [`
       
        .preview-outer-pane {
            position: relative;
            top: 78px;
            /*background-color: #7e003c;*/
            width: 100%;
        }

        .preview-pane {
            width: 320px;
            height: 514px;

            margin-left: auto;
            margin-right: auto;
            position: relative;
        }

    `]
})
export class PreviewPaneMobileViewComponent implements OnInit {
    message$: Observable<GameMessage> = this.store.select(getEditMessageSelector);
    aggregatePreviewSelector$: Observable<any> = this.store.select(aggregatePreviewSelector);


    constructor(private store: Store<State>) {
    }

    ngOnInit() {
    }

}
