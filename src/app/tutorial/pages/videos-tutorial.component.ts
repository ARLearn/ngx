import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Game} from "../../game-management/store/current-game.state";
import {
    currentFaqGame,
    currentVideoGame,
    getFaqGames,
    getVideoGames,
    orderedFAQVideos
} from "../store/tutorial.selector";
import {Store} from "@ngrx/store";
import {State} from "../../core/reducers";
import {GetGameRequestAction, GetTutorialGamesRequestAction, SelectVideoCategory} from "../store/tutorial.actions";
import {environment} from "../../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-videos-tutorial',
    template: `
        <app-top-level-navbar [title]="'Help'">
            <app-subtabs-navbar [items]="subMenuItems"></app-subtabs-navbar>
        </app-top-level-navbar>
        <div class="bg-white">
            <div class="maxwidth">
                <div class="questions-wrapper">
                    <div class="sidebar">
                        <button
                                [ngClass]="{'selected': 'all' === (selectedGame|async)}"
                                (click)="selectGame('all')"
                                class="btn-category ">Alle video’s
                        </button>
                        <button
                                [ngClass]="{'selected': topic.gameId === (selectedGame|async)}"
                                (click)="selectGame(topic.gameId)"
                                class="btn-category" *ngFor="let topic of ((videoGames$|async))">
                            {{topic.title}}
                        </button>
                    </div>

                    <div class="main-content">
                        <h2 class="title">Video instructies</h2>

                        <app-video-cards
                                [gameId]="(selectedGame|async)"
                        ></app-video-cards>
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
                padding-bottom: 30px;
            }

            .main-content .title {
                margin-top: 60px;
                font-weight: 500;
            }
        `]
})
export class VideosTutorialComponent implements OnInit {
    gameTopicIds = environment.tutorial.videoTopics;
    videoGames$: Observable<Game[]> = this.store.select(orderedFAQVideos);
    selectedGame: Observable<any> = this.store.select(currentVideoGame);
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

    constructor(
        public store: Store<State>,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.store.dispatch(new SelectVideoCategory(params.gameId || 'all'));
        });

        this.gameTopicIds.forEach((gameId) => this.store.dispatch(new GetGameRequestAction(gameId)));


        this.gameTopicIds.forEach((gameId) => this.store.dispatch(new GetTutorialGamesRequestAction({
            gameId: gameId,
            faq: false
        })));
    }

    selectGame(game) {
        if (game === 'all') {
            return this.router.navigate(['/portal/tutorial/video']);

        }

        return this.router.navigate(['/portal/tutorial/video', game]);
    }

}
