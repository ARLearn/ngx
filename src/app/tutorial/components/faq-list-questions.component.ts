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
        <div>
            <h1>Veelgestelde vragen (FAQ)</h1>
            {{gameId}}
        </div>

        <div *ngFor="let questions of ((questions|async))">
            {{questions.name}}
            <b>and in html</b>
            {{questions.richText}}
        </div>

    `,
    styles: []
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
