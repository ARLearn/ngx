import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {GameMessage} from "../../../../game-messages/store/game-messages.state";
import {getEditMessageSelector} from "../../../store/game-message.selector";
import {Store} from "@ngrx/store";
import {State} from "../../../../core/reducers";

@Component({
    selector: 'app-mobile-preview-answer-feedback',
    template: `
        <app-background-image-selector [key]="answer.isCorrect?'correct':'wrong'">
            <app-preview-navbar></app-preview-navbar>
            <div class="full-with-height-container">
                <div class="text-box-preview">
                    <div class="screen-preview-card-title font-regular-16-24-roboto">
                        {{answer.feedback}}
                    </div>
                    <!--                    <div class="text-preview">-->
                    <!--                        {{answer.feedback}}-->
                    <!--                    </div>-->
                </div>
            </div>
        </app-background-image-selector>
    `,
    styles: [`
    `]
})
export class MobilePreviewAnswerFeedbackComponent implements OnInit {

    @Input() answer: any;
    message$: Observable<GameMessage> = this.store.select(getEditMessageSelector);

    constructor(public store: Store<State>) {
    }

    ngOnInit() {
    }

}
