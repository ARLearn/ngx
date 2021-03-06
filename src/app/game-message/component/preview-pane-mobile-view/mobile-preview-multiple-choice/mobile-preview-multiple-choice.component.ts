import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {GameMessage} from "../../../../game-messages/store/game-messages.state";
import {getEditMessageSelector, selectedColor} from "../../../store/game-message.selector";
import {Store} from "@ngrx/store";
import {State} from "../../../../core/reducers";

@Component({
    selector: 'app-mobile-preview-multiple-choice',
    template: `
        
        <app-background-image-selector
                [hideControls]="hideControls"
        >
            <app-preview-navbar></app-preview-navbar>
            <div class="full-with-height-container">
                <div class="text-box-preview">
                    <div
                            [ngStyle]="{'color': (selectedColor$ |async) }"
                            class="screen-preview-card-title font-bold-20px-24px-gentium-basic"> {{(message$|async)?.text}}</div>
                    <div class="text-preview" *ngFor="let answer of ((message$|async)?.answers)">

                        <div class="answer-text font-regular-16-24-roboto">
                            <mat-icon class="pos-answer-icon">check_box_outline_blank</mat-icon>
                            <div class="pos-answer-text">{{answer.answer}}</div>
                        </div>

                    </div>
                    <button
                            class="gl-pos-button-right pos-button"
                            [ngStyle]="{'background-color': (selectedColor$ |async) }"
                            mat-raised-button>Verder</button>
                </div>

            </div>
        </app-background-image-selector>
    `,
    styles: [`
        .text-preview {
            position: relative;
            margin-left: 24px;
            margin-top: 0px;
            margin-bottom: 15px;
            text-align: left;
            max-height: 300px;
        }

        .answer-text {
            position: relative;
            left: 0px;
            text-align: left;
            letter-spacing: 0;
            color: #0000008A;
            opacity: 1;
            min-height: 30px;
            /*padding-bottom: 10px;*/

        }

        .pos-answer-icon {
            position: absolute;
            top: 10px;
            right: 24px;
        }

        .pos-answer-text {
            position: relative;
            top: 10px;
            width: 156px ;
            left: 24px;
        }

        .pos-button {
            right: 5px;
            bottom: -10px;
            color: white;
        }
    `]
})
export class MobilePreviewMultipleChoiceComponent implements OnInit {
    @Input() hideControls = false;

    message$: Observable<GameMessage> = this.store.select(getEditMessageSelector);
    selectedColor$: Observable<string> = this.store.select(selectedColor);

    constructor(public store: Store<State>) {
    }

    ngOnInit() {
    }

}
