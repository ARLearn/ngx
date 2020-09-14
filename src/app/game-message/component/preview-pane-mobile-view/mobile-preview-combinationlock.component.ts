import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {GameMessage} from "../../../game-messages/store/game-messages.state";
import {getEditMessageSelector, selectedColor} from "../../store/game-message.selector";
import {Store} from "@ngrx/store";
import {State} from "../../../core/reducers";

@Component({
    selector: 'app-mobile-preview-combinationlock',
    template: `
        <app-background-image-selector
                [hideControls]="hideControls"
        >
            <app-preview-navbar></app-preview-navbar>
            <div class="full-with-height-container">
                <div class="instruction"
                     [ngStyle]="{'background-color': (selectedColor$ |async) }"
                >
                    {{(message$|async)?.text}}
                </div>
                <div class="make-dark">
                    <!--                    <div-->
                    <!--                            *ngFor="let letter of combination"-->
                    <!--                            >letter {{letter}}</div>-->
                    <div class="combination-outer">
                        <app-combination-entry
                                *ngFor="let letter of combination"
                                [letter]="letter"></app-combination-entry>
                    </div>
                </div>

                <!--                    <div-->
                <!--                            [ngStyle]="{'color': (selectedColor$ |async) }"-->
                <!--                            class="screen-preview-card-title font-bold-20px-24px-gentium-basic"> {{(message$|async)?.text}}</div>-->


                <!--          <div class="text-preview" *ngFor="let answer of ((message$|async)?.answers)">-->

                <!--         -->

                <!--          </div>-->
                <!--          <button-->
                <!--              class="gl-pos-button-right pos-button"-->
                <!--              [ngStyle]="{'background-color': (selectedColor$ |async) }"-->
                <!--              mat-raised-button>Verder</button>-->
                <!--                </div>-->

            </div>
        </app-background-image-selector>
    `,
    styles: [`
        .make-dark {
            position: absolute;
            bottom: 0px;
            left: 0px;
            right: 0px;
            top: 0px;
            /*padding-bottom: 22px;*/
            /*max-height: 350px;*/

            background: #FFFFFF 0% 0% no-repeat padding-box;
            box-shadow: 0px 19px 38px #00000042;
            border-radius: 2px;

            /*display: flex;*/
            /*flex-direction: column;*/
            overflow-x: hidden;
            opacity: 0.6;
            background-color: black;
        }

        .instruction {
            position: relative;
            z-index: 5;
            top: 44px;
            padding-left: 30px;
            padding-right: 30px;
            text-align: center;
            color: white;
        }

        .combination-outer {
            position: relative;
            top: 230px;
            height: 165px;
            display: flex;
            flex-direction: row;
            /*background-color: #1b77c5;*/
            justify-content: space-around;
            color: white;
        }

        .pos-button {
            right: 5px;
            bottom: -10px;
            color: white;
        }
    `]
})
export class MobilePreviewCombinationlockComponent implements OnInit, OnDestroy {


    @Input() hideControls = false;

    combination = ['1', '2', '3'];
    message$: Observable<GameMessage> = this.store.select(getEditMessageSelector);
    selectedColor$: Observable<string> = this.store.select(selectedColor);

    subscription: Subscription;

    constructor(public store: Store<State>) {
    }

    ngOnInit(): void {
        this.subscription = this.message$.subscribe((m: any) => {
            console.log("answers", m.answers);

            m.answers.forEach(a => {
                console.log("answers", a);
                if (a['isCorrect']) {
                    this.combination = a['answer'].trim().substr(0,5).split('');
                }

            });
        });
    }


    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
