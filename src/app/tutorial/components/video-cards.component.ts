import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../core/reducers";
import {GetGameRequestAction} from "../store/tutorial.actions";
import {Observable} from "rxjs";
import {GameMessage} from "../../game-messages/store/types";
import {sortedMessages} from "../store/tutorial.selector";

@Component({
    selector: 'app-video-cards',
    template: `
        <h4 class="topic-heading primary-color">{{ category }}</h4>
        <div class="card-wrapper">
            <app-video-card *ngFor="let video of (videos$ | async)" class="question-card"
                            [video]="video"></app-video-card>
        </div>
    `,
    styles: [
            `
            .question-card {
                box-shadow: none;
                border-radius: 0;
                border: 1px solid #EEEEEE;
                cursor: pointer;
            }
            
            .topic-heading {
                padding: 14px 20px;
                margin: 50px 0 30px;
                font-weight: 400;
                background-color: rgba(62, 163, 220, 0.07);
            }

            .card-wrapper {
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-gap: 16px;
            }


        `
    ]
})
export class VideoCardsComponent implements OnInit, OnChanges {
    @Input() category = 'Alle video\'s';
    @Input() videos = [1, 2];
    @Input() showAllVideos = true;

    @Input() gameId: number;
    videos$: Observable<GameMessage[]> = this.store.select(sortedMessages);

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
