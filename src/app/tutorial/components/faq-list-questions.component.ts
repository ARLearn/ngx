import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../core/reducers";
import {GetGameRequestAction} from "../store/tutorial.actions";
import {GameMessage} from "../../game-messages/store/types";
import {Observable} from "rxjs";
import {sortedMessages} from "../store/tutorial.selector";

@Component({
    selector: 'app-faq-list-questions',
    template: `
        <h2 class="title">Veelgestelde vragen</h2>

        <div class="topic">
            <h4 class="topic-heading primary-color">Aanschaf</h4>

            <div class="topic-questions">
                <app-question *ngFor="let question of ((questions|async))" [question]="question"></app-question>
            </div>
        </div>

    `,
    styles: [
        `
            .title {
                margin-top: 60px;
                font-weight: 500;
            }
            .topic {
                margin-top: 40px;
            }
            .topic-heading {
                padding: 10px 20px;
                margin-bottom: 20px;
                font-weight: 400;
                background-color: rgba(62, 163, 220, 0.07);
            }
            ::ng-deep .topic-questions > *:first-child .question {
                border-top: 1px solid #F0F0F0;
            }
        `
    ]
})
export class FaqListQuestionsComponent implements OnInit, OnChanges {

    @Input() gameId: number;
    questions: Observable<GameMessage[]> = this.store.select(sortedMessages);

    constructor(private store: Store<State>) {
    }


    ngOnInit(): void {

    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.gameId != null) {
            this.store.dispatch(new GetGameRequestAction(this.gameId));
        }

    }

}
