import {Component, Directive, HostListener, Input, OnInit} from '@angular/core';
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {
    GameMessageAddAnswerAction,
    GameMessageUpdateAnswerAction,
    GameMessageUpdateFileReferenceAction
} from "../../../../store/game-message.actions";
import {select, Store} from "@ngrx/store";
import {State} from "../../../../../core/reducers";
import {SelectAssetComponent} from "../../../../../media-library/modal/select-asset/select-asset.component";
import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {iCanWrite} from 'src/app/game-management/store/current-game.selector';

@Component({
    selector: 'app-answer-component',
    template: `
        <div>
            <div class="pos-answer-header">
                <div class="pos-title primary-color font-regular-24-24-roboto">{{'MESSAGE.ANSWER_OPTION' | translate}} {{index}} </div>
                <mat-icon
                        class="style-icon"
                        (click)="remove()"
                        [svgIcon]="'close'"></mat-icon>
            </div>
            <mat-form-field class="mat-form-messages gl-pos-between-fields" *ngIf="!imageAnswer">

                <input matInput [placeholder]="'GAME.TITLE' |translate"
                       [disabled]="!(iCanWrite|async)"

                       [ngModel]="answer.answer"
                       (ngModelChange)="answerChange($event)">
            </mat-form-field>

            <mat-slide-toggle
                    class="gl-pos-between-fields gl-pos-field-full-width font-regular-11-15-roboto gl-multiple-choice color-black-8a"
                    [disabled]="!(iCanWrite|async)"
                    [ngModel]="answer.isCorrect"
                    [labelPosition]="'before'"
                    (change)="isCorrectChange($event)">{{'MESSAGE.OPTION_CORRECT'|translate}}
            </mat-slide-toggle>

            <div class="pos-answer-image-text font-regular-11-15-roboto color-black-8a" *ngIf="imageAnswer">
                {{'MESSAGE.ANSWER_IMAGE' |translate}}
            </div>
            <div class="pos-answer-image-container gl-pos-field-full-width gl-pos-between-fields"
                 *ngIf="imageAnswer">
                <div class="pos-answer-image">
                    <app-filestore-background-image
                            *ngIf="fileRefs[answer.id]"
                            [paths]="[fileRefs[answer.id]]"
                            [deleteButton]="false"

                    >
                        <ng-content></ng-content>
                    </app-filestore-background-image>
                    <div
                            class="pos-answer-image pos-answer-no-image"
                            *ngIf="!fileRefs[answer.id]"
                    >
                        <div class="pos-icon-image-answer">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 width="70" height="44" viewBox="0 0 144 92">
                                <defs>
                                    <style>.a {
                                        fill: #0000008A;
                                    }</style>
                                </defs>
                                <path class="a"
                                      d="M117.675,38.717c0-.383.064-.767.064-1.15A37.1,37.1,0,0,0,47.025,21.4,19.087,19.087,0,0,0,19.511,35.458,29.082,29.082,0,0,0,28.768,92H61.714V66.444H46.221L72,39.707,97.779,66.412H82.286V91.968h35.454a26.628,26.628,0,0,0-.064-53.251Z"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="pos-answer-image-instruction font-regular-16-24-roboto color-black-de">
                    <div>{{'MESSAGE.DRAG_OR_ADD_IMAGE'|translate}}</div>
                    <button mat-stroked-button
                            class="pos-select-image-button"
                            color="primary" (click)="selectAnswerImage()">{{'COMMON.BROWSE'|translate}}
                    </button>
                </div>
            </div>

            <mat-form-field class="gl-pos-field-full-width gl-pos-between-fields" *ngIf="feedback">

                <input appTriggerMobileView [data]="answer" [name]="'answer'" matInput placeholder="Feedback" [disabled]="!feedback"
                       [disabled]="!(iCanWrite|async) "

                       [ngModel]="answer.feedback"
                       (ngModelChange)="feedbackChange($event)">
            </mat-form-field>

            <div class="pos-answer-image-text font-regular-11-15-roboto color-black-8a" *ngIf="feedback">
                {{'MESSAGE.FEEDBACK_IMAGE' |translate}}
            </div>
            <div class="pos-feedback-image-container gl-pos-field-full-width gl-pos-between-fields" *ngIf="feedback">
                <div class="pos-feedback-image">
                    <app-filestore-background-image
                            *ngIf="fileRefs[answer.isCorrect?'correct':'wrong']"
                            [paths]="[fileRefs[answer.isCorrect?'correct':'wrong']]"
                            [deleteButton]="false"

                    >
                        <ng-content></ng-content>
                    </app-filestore-background-image>
                    <div
                            class="pos-feedback-image pos-answer-no-image"
                            *ngIf="!fileRefs[answer.isCorrect?'correct':'wrong']"
                    >
                        <div class="pos-icon-image">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 width="70" height="44" viewBox="0 0 144 92">
                                <defs>
                                    <style>.a {
                                        fill: #0000008A;
                                    }</style>
                                </defs>
                                <path class="a"
                                      d="M117.675,38.717c0-.383.064-.767.064-1.15A37.1,37.1,0,0,0,47.025,21.4,19.087,19.087,0,0,0,19.511,35.458,29.082,29.082,0,0,0,28.768,92H61.714V66.444H46.221L72,39.707,97.779,66.412H82.286V91.968h35.454a26.628,26.628,0,0,0-.064-53.251Z"/>
                            </svg>


                        </div>

                    </div>
                </div>
                <div class="pos-feedback-image-instruction font-regular-16-24-roboto color-black-de">
                    <div>{{'MESSAGE.DRAG_OR_ADD_IMAGE'|translate}}</div>
                    <button mat-stroked-button
                            class="pos-select-image-button"
                            color="primary" (click)="selectFeedbackImage(answer.isCorrect?'correct':'wrong')">{{'COMMON.BROWSE'|translate}}
                    </button>
                </div>
            </div>

            <div class="pos-horizontal-line black-color gl-pos-between-fields"></div>
            
        </div>

    `,
    styles: [`
        .pos-answer-header {
            display: flex;
            justify-content: space-between;
        }

        .pos-title {
            position: relative;
            margin-bottom: 37px;
        }

        .style-icon {
            position: relative;
            top: 3px;
            transform: scale(0.83);
            cursor: pointer;
        }

        /*.mat-slide-toggle-label > .mat-slide-toggle-bar {*/
        /*    right: 0px;*/
        /*    position: absolute;*/
        /*}*/
        .pos-answer-image-container {
            position: relative;
            height: 152px;
            margin-top: 13px;
        }

        .pos-answer-image {
            position: absolute;
            top: 0px;
            left: 0px;
            width: 150px;
            height: 152px;
        }

        .pos-answer-no-image {
            background: #FFFFFF 0% 0% no-repeat padding-box;
            border: 2px dashed #000000;
            border-radius: 4px;
            opacity: 0.12;
        }

        .pos-answer-image-instruction {
            position: absolute;
            left: 150px;
            padding-top: 30px;
            padding-left: 46px;
        }

        .pos-select-image-button {
            position: relative;
            margin-top: 18px;
            text-transform: uppercase;
        }

        .pos-feedback-image-container {
            position: relative;
            height: 238px;
            margin-top: 13px;
        }

        .pos-feedback-image {
            position: absolute;
            top: 0px;
            left: 0px;
            width: 150px;
            height: 100%;
        }

        .pos-icon-image-answer{
            position: relative;
            margin-top: 53px;
            text-align: center;
        }
        .pos-icon-image {
            position: relative;
            margin-top: 80px;
            text-align: center;
        }

        .style-icon-image {
            transform: scale(5);
        }

        .pos-feedback-image-instruction {
            position: absolute;
            left: 150px;
            padding-top: 64px;
            padding-left: 46px;
        }
        
        .pos-horizontal-line {
            position: relative;
            width: 100%;
            border: 1px solid #000000;
            opacity: 0.12;
        }
    `]
})
export class AnswerComponentComponent implements OnInit {

    @Input() index: number;
    @Input() imageAnswer = false;
    @Input() answer;
    @Input() fileRefs = {};
    @Input() feedback = false;
    public iCanWrite: Observable<boolean> = this.store.pipe(select(iCanWrite));

    constructor(
        private store: Store<State>,
        public dialog: MatDialog
    ) {
    }

    ngOnInit() {
    }

    answerChange(event: any) {
        console.log("answer", event);
        this.store.dispatch(new GameMessageUpdateAnswerAction({
            delete: false,
            id: this.answer.id,
            field: "answer",
            value: event
        }));
    }

    feedbackChange(event: any) {
        this.store.dispatch(new GameMessageUpdateAnswerAction({
            delete: false,
            id: this.answer.id,
            field: "feedback",
            value: event
        }));
    }

    isCorrectChange(event: MatSlideToggleChange) {
        this.store.dispatch(new GameMessageUpdateAnswerAction({
            delete: false,
            id: this.answer.id,
            field: "isCorrect",
            value: event.checked
        }));
    }

    remove() {
        this.store.dispatch(new GameMessageUpdateAnswerAction({
            delete: true,
            id: this.answer.id
        }));

    }

    selectAnswerImage() {
        const dialogRef = this.dialog.open(SelectAssetComponent, {
            panelClass: ['modal-fullscreen', "modal-dialog"],
            data: {}
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log("image select result", result);
            this.store.dispatch(new GameMessageUpdateFileReferenceAction({
                delete: false,
                key: this.answer.id,
                value: result

            }));
        });
    }


    selectFeedbackImage(key) {
        const dialogRef = this.dialog.open(SelectAssetComponent, {
            panelClass: ['modal-fullscreen', "modal-dialog"],
            data: {}
        });
        dialogRef.afterClosed().subscribe(result => {
            this.store.dispatch(new GameMessageUpdateFileReferenceAction({
                delete: false,
                key: key,
                value: result

            }));
        });
    }
}

