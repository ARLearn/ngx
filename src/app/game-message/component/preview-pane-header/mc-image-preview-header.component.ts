import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {GameMessage} from "../../../game-messages/store/game-messages.state";
import {aggregatePreviewSelector, getEditMessageSelector} from "../../store/game-message.selector";
import {Store} from "@ngrx/store";
import {State} from "../../../core/reducers";

@Component({
    selector: 'app-mc-image-preview-header',
    template: `
        <div class="primary-background-color pos-container">
            <div class="pos-preview-text font-regular-24-24-roboto white-color">Preview</div>
            <div
                    class="pos-feedback font-medium-12-16-roboto white-color"
                    *ngIf="(message$|async)?.showFeedback">
                <div
                        appTriggerMobileView [data]="{}" [name]="'mc'"
                        class="pos-feedback-item"
                        [ngClass]="(aggregatePreviewSelector$|async)?.ptype === 'mc' ? ['style-opacity-one']: []"
                >vraag
                </div>


                <div
                        *ngFor="let answer of (message$|async)?.answers; let i = index"
                        appTriggerMobileView [data]="answer" [name]="'answer'"
                        [ngClass]="((aggregatePreviewSelector$|async)?.ptype === 'answer' && answer.id === (aggregatePreviewSelector$|async)?.data.id)? ['style-opacity-one']: []"
                        class="pos-feedback-item">FEEDBACK {{i + 1}}
                </div>

            </div>
        </div>

    `,
    styles: [`
        .pos-container {
            position: relative;
            width: 100%;
            top: 0px;
            height: 82px;
        }

        .pos-preview-text {
            position: relative;
            top: 15px;
            margin-left: 19px;
        }

        .pos-feedback {
            position: absolute;
            top: 60px;
            margin-left: 19px;
            display: flex;
            text-transform: uppercase;
            cursor: pointer;
        }

        .pos-feedback-item {
            margin: 0px 15px 0 0;
            opacity: 0.5;
        }

        .style-opacity-one {
            opacity: 1;
        }

    `]
})
export class McImagePreviewHeaderComponent implements OnInit {
    message$: Observable<GameMessage> = this.store.select(getEditMessageSelector);
    aggregatePreviewSelector$: Observable<any> = this.store.select(aggregatePreviewSelector);

    constructor(private store: Store<State>) {
    }

    ngOnInit(): void {
    }

}
