import {Component, OnChanges, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../core/reducers";
import {GetGameRequestAction, GetTutorialGamesRequestAction} from "../store/tutorial.actions";
import {Observable} from "rxjs";
import {currentVideoMessage} from "../store/tutorial.selector";
import {GameMessage} from "../../game-messages/store/game-messages.state";
import * as fromRootSelector from "../../core/selectors/router.selector";
import {AngularFireStorage} from "angularfire2/storage";


@Component({
    selector: 'app-video-tutorial',
    template: `
        <app-top-level-navbar [title]="'Help'">
            <app-subtabs-navbar [items]="subMenuItems"></app-subtabs-navbar>
        </app-top-level-navbar>
        <div class="bg-white">
            <div class="maxwidth content">
                <div class="back-content">
                    <button class="btn-back" mat-stroked-button color="primary"
                            routerLink="/portal/tutorial/video">{{ 'HELP.BACK' | translate }}</button>
                </div>
                <main class="main">
                    <div class="main-content">
                        <h2 class="title">{{(selectedMessage|async)?.name}}</h2>
                        <p>Bekijken, 7 min.</p>

                        <div class="video">
                            <video id='video' controls="controls" preload='none'
                                   poster="http://media.w3.org/2010/05/sintel/poster.png">
                                <source id='mp4' [src]="(videoUrl |async)" type='video/mp4'/>
<!--                                <source id='webm' src="http://media.w3.org/2010/05/sintel/trailer.webm" type='video/webm'/>-->
<!--                                <source id='ogv' src="http://media.w3.org/2010/05/sintel/trailer.ogv" type='video/ogg'/>-->
                                <p>Your user agent does not support the HTML5 Video element.</p>
                            </video>
                        </div>

                        <article class="article">
                            {{videoUrl |async}}
                            <h5 class="article-title">Tussenkopje lorum ipsim dolor sit amet</h5>

                            <p class="article-body">{{(selectedMessage|async)?.richText}}</p>
                        </article>
                    </div>

                    <div class="meta">
                        <span class="meta-item">{{ 'HELP.BACK_TO' | translate }}: <a class="primary-color"
                                                                                     routerLink="/portal/tutorial/video">Introductie</a></span>
                        <span class="meta-item">{{ 'HELP.NEXT' | translate }}: <a class="primary-color"
                                                                                  routerLink="/portal/tutorial/video">Een account aanmaken</a></span>
                    </div>

                    <div class="main-content">
                        <app-video-cards></app-video-cards>
                    </div>
                </main>
            </div>
        </div>
    `,
    styles: [`
        .btn-back {
            text-transform: uppercase;
            border-color: currentColor;
            width: 100%;
        }

        .back-content {
            margin-top: 10px;
        }

        .back-content button {
            width: 84px;
        }

        .content {
            display: flex;
            align-items: flex-start;
            padding-top: 64px;
        }

        .main {
            margin-bottom: 100px;
        }

        .main-content {
            padding: 0 84px;
        }

        .title {
            font-weight: 700;
            margin-bottom: 30px;
            line-height: 48px;
        }

        .video video {
            width: 100%;
        }

        .meta {
            padding: 40px 0;
            text-align: center;
            border-top: 1px solid #eaeaea;
            border-bottom: 1px solid #eaeaea;
            font-weight: 500;
        }

        .meta > * {
            padding: 0 15px;
        }

        .meta-item:first-child {
            border-right: 1px solid #000000;
        }

        .video {
            margin: 50px 0 75px;
        }

        .article {
            padding-bottom: 40px;
        }

        .article-title {
            margin-bottom: 20px;
        }

        .article-body {
            line-height: 24px;
        }
    `]
})
export class VideoTutorialComponent implements OnInit, OnChanges {

    videoUrl: Observable<string>;

    selectedMessage: Observable<GameMessage> = this.store.select(currentVideoMessage);
    gameId: Observable<string> = this.store.select(fromRootSelector.selectRouteParam('gameId'));
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

    constructor(public store: Store<State>, public afStorage: AngularFireStorage) {
    }

    ngOnInit(): void {
        this.ngOnChanges();
    }

    ngOnChanges(): void {
        this.selectedMessage.subscribe(video => {
            if (video != null) {
                console.log("video url is ",video.fileReferences['video']);
                this.videoUrl = this.afStorage.ref(video.fileReferences['video']).getDownloadURL();
            }

            }
        );
        this.gameId.subscribe(id =>
            this.store.dispatch(new GetGameRequestAction(Number.parseInt(id, 10))));
    }

}
