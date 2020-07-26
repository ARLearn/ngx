import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Store} from "@ngrx/store";
import {State} from "../../core/reducers";
import {GetTutorialGamesRequestAction} from "../store/tutorial.actions";
import {Observable} from "rxjs";
import {Game} from "../../game-management/store/current-game.state";
import {getFaqGames} from "../store/tutorial.selector";
import * as fromRoot from "../../core/selectors/router.selector";

@Component({
    selector: 'app-faq-tutorial',
    template: `
        <app-top-level-navbar [title]="'Help'">
        </app-top-level-navbar>

        <div class="context-tabs">

        </div>
        <div class="full-width-container maxwidth">
            <h1>These are the topics that go in the left pane</h1>
            {{gameTopicIds}}
            <div *ngFor="let topic of ((faqGames|async))">
                {{topic.title}}
            </div>

        </div>
        
        
        <app-faq-list-questions
        [gameId]="selectedGame|async"
        ></app-faq-list-questions>

    `,
    styles: []
})
export class FaqTutorialComponent implements OnInit {

    // gameTopicIds = environment.tutorial.faqTopics;
    gameTopicIds = [];
    faqGames: Observable<Game[]> = this.store.select(getFaqGames);

    selectedGame: Observable<any> = this.store.select(fromRoot.selectRouteParam('gameId'));

    constructor(private store: Store<State>) {
    }


    ngOnInit(): void {

        this.gameTopicIds.forEach((gameId) => this.store.dispatch(new GetTutorialGamesRequestAction(gameId)));
    }

}
