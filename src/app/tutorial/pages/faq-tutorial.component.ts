import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from 'src/app/core/reducers';
import {currentFaqGame, getFaqGames} from "../store/tutorial.selector";
import {environment} from "../../../environments/environment";
import {Game} from "../../game-management/store/current-game.state";
import {Observable} from "rxjs";
import * as fromRoot from "../../core/selectors/router.selector";
import {ClearMessages, GetTutorialGamesRequestAction} from "../store/tutorial.actions";

@Component({
    selector: 'app-faq-tutorial',
    template: `
        <app-top-level-navbar [title]="'FAQ'">
            <app-subtabs-navbar [items]="subMenuItems"></app-subtabs-navbar>
        </app-top-level-navbar>
        <div class="bg-white">
            <div class="maxwidth">
                <div class="questions-wrapper">
                    <div class="sidebar">
                        <button
                            [ngClass]="{'selected': topic.gameId === (selectedGame|async)}"
                            [routerLink]="'/portal/tutorial/faq/'+topic.gameId"
                            class="btn-category" *ngFor="let topic of ((faqGames|async))"
                        >
                        {{topic.title}}
                        </button>
                    </div>

                    <div class="main-content">
                        <app-faq-list-questions [gameId]="selectedGame|async"
                        ></app-faq-list-questions>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [
            `
            .questions-wrapper {
                display: flex;
                min-height: calc(100vh - 144px);
            }

            .sidebar {
                display: flex;
                flex-direction: column;
                justify-content: center;
                min-width: 280px;
                margin-right: 40px;
                padding-right: 50px;

                border-right: 1px solid #DDDDDD;
            }

            .btn-category {
                display: block;
                width: 100%;
                margin-bottom: 2px;
                padding: 0.5rem 1rem;
                background: none;
                text-align: left;
                outline: none;
                border: none;
                cursor: pointer;
            }

            .btn-category.selected {
                font-weight: 500;
            }

            .btn-category.selected,
            .btn-category:hover {
                background-color: #f2f9fd;
            }

            .main-content {
                flex: 1;
            }
        `
    ]
})
export class FaqTutorialComponent implements OnInit, OnDestroy {

    gameTopicIds = environment.tutorial.faqTopics;
    defaultGame = environment.tutorial.defaultFaq;
    faqGames: Observable<Game[]> = this.store.select(getFaqGames);

    selectedGame: Observable<any> = this.store.select(currentFaqGame);

    subMenuItems = [
        {
            routerLink: '/portal/tutorial/video',
            label: 'HELP.VIDEO_INSTRUCTIONS'
        },
        {
            routerLink: '/portal/tutorial/faq',
            label: 'HELP.QUESTIONS'
        },
    ];

    constructor(public store: Store<State>) {}

    ngOnInit(): void {
        this.gameTopicIds.forEach((gameId) => this.store.dispatch(new GetTutorialGamesRequestAction({
            gameId: gameId,
            faq: true
        })));
    }

    ngOnDestroy() {
        this.store.dispatch(new ClearMessages());
    }
}
