import { Component, Input, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { State } from "../../core/reducers";
import { Observable } from "rxjs";
import { GameMessage } from "../../game-messages/store/types";
import { selectedVideoGame, sortedMessages } from "../store/tutorial.selector";

@Component({
    selector: 'app-video-cards',
    template: `
        <h4 class="topic-heading primary-color">{{ (selectedGame$ | async)?.title || 'Alle video’s'}}</h4>
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
export class VideoCardsComponent implements OnInit {
    @Input() category = 'Alle video\'s';
    @Input() gameId: number;

    videos$: Observable<GameMessage[]> = this.store.select(sortedMessages);
    selectedGame$ = this.store.select(selectedVideoGame);

    constructor(private store: Store<State>) {
    }


    ngOnInit(): void {

    }

}
