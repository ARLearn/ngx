import { Component } from '@angular/core';
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { GameMessage } from "../../../../game-messages/store/game-messages.state";
import { getEditMessageSelector, selectedColor } from "../../../store/game-message.selector";
import { State } from "../../../../core/reducers";
import { GameMessageAddAnswerAction, GameMessageUpdateAction, RemoveColorAction } from "../../../store/game-message.actions";
import { Game } from "../../../../game-management/store/current-game.state";
import { getGame, iCanWrite } from "../../../../game-management/store/current-game.selector";

@Component({
    selector: 'app-screen-editor-type-single-choice-test',
    template: `
        <mat-form-field class="mat-form-messages">

            <input matInput [placeholder]="'GAME.TITLE'|translate"
                   [disabled]="!(iCanWrite|async)"
                   [ngModel]="(message$|async)?.name"
                   (ngModelChange)="titleChange($event)">
        </mat-form-field>
        
        <mat-form-field class="mat-form-messages">

            <input appTriggerMobileView [data]="{}" [name]="'mc'"
                   matInput
                   [placeholder]="'GAME.QUESTION'|translate"
                   [disabled]="!(iCanWrite|async)"
                   [ngModel]="(message$|async)?.text"
                   (ngModelChange)="textChange($event)">
        </mat-form-field>

        <mat-slide-toggle class="gl-pos-between-fields"
                          [disabled]="!(iCanWrite|async)"
                          [ngModel]="(message$|async)?.showFeedback"
                          (change)="feedbackChange($event)">{{'MESSAGE.FEEDBACK_POSSIBLE' |translate}}
        </mat-slide-toggle>

        <div *ngIf=" (message$|async)?.answers">
            <div class="answer-container"
                 *ngFor="let answer of (message$|async)?.answers;let i = index">
                <app-answer-component
                        [index]="i+1"
                        [answer]="answer"
                        [fileRefs]="((message$|async)?.fileReferences)"
                        [feedback]="(message$|async)?.showFeedback"
                ></app-answer-component>
            </div>
        </div>

        <app-pick-location-on-map
                class="gl-pos-between-fields"
                [locationBased]="(message$|async)?.lat"
                [showInList]="(message$|async)?.showInList"
                [lat]="(message$|async)?.lat"
                [lng]="(message$|async)?.lng"
        >

        </app-pick-location-on-map>

        <div class="gl-pos-between-fields color-picker-class">
            <app-color-input
                    [canEdit]="(iCanWrite|async)"
                    [label]="'Primaire steunkleur'"
                    [color]="primColor$ | async"
                    [unselect]="true"
                    (onChange)="primColorChange($event)"
            ></app-color-input>
        </div>

        <app-create-label
                class="gl-pos-between-fields"
                [label]="(message$|async)?.label">
        </app-create-label>
<!--        <app-dependency-read-temp class="gl-pos-between-fields">-->

<!--        </app-dependency-read-temp>-->
        
        <div class="pos-button-add-answer" *ngIf="iCanWrite|async">
            <button
                    class="pos-button-add-answer-text gl-style-button-no-shadow gl-style-large-button"
                    mat-raised-button color="primary" (click)="addAnswer()" >
                {{'MESSAGE.ADD_ANSWER_OPTION' | translate}}
            </button>
        </div>
    `,
    styles: [`
        .answer-container {
            margin-top: 100px;
        }

        .color-picker-class {
            height: 35px;
            top: 10px
        }
        .pos-button-add-answer {
            position: absolute;
            left:0px;
            bottom: -64px;
        }

        .pos-button-add-answer-text{
            width: 261px;
        }
    `]
})
export class ScreenEditorTypeSingleChoiceTestComponent {
    primColor$ = this.store.select(selectedColor);
    message$: Observable<GameMessage> = this.store.select(getEditMessageSelector);
    game$: Observable<Game> = this.store.select(getGame);
    iCanWrite: Observable<boolean> = this.store.pipe(select(iCanWrite));

    constructor(private store: Store<State>) {}

    titleChange(event: any) {
        this.store.dispatch(new GameMessageUpdateAction({name: event}));
    }

    textChange(event: any) {
        this.store.dispatch(new GameMessageUpdateAction({text: event}));
    }

    feedbackChange(event: MatSlideToggleChange) {
        this.store.dispatch(new GameMessageUpdateAction({showFeedback: event.checked}));
    }

    addAnswer() {
        this.store.dispatch(new GameMessageAddAnswerAction({type: "org.celstec.arlearn2.beans.generalItem.MultipleChoiceAnswerItem"}));
    }

    primColorChange(color: string) {
        if (color === "default") {
            this.store.dispatch(new RemoveColorAction());
        } else {
            this.store.dispatch(new GameMessageUpdateAction({primaryColor: color}));
        }
    }
}
