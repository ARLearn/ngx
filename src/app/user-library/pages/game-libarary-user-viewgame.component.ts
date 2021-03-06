import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../core/reducers";
import {Observable} from "rxjs";
import {getSelectedGame} from "../store/user-library.selectors";
import {GetGameAction} from "../store/user-library.actions";
import {Router} from "@angular/router";
import {CloneGameRequestAction} from "../../games-management/store/game.actions";
import {environment} from "../../../environments/environment";
import {NewRunDialogComponent} from "../../game-runs-management/components/new-run-dialog/new-run-dialog.component";
import {CreateRunRequestAction} from "../../game-runs-management/store/game-runs.actions";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'app-game-libarary-user-viewgame',
    template: `
        <app-top-level-navbar [title]="(game$ | async)?.title">

        </app-top-level-navbar>
        <div class="game maxwidth d-flex" *ngIf="game$ | async as game">
            <div class="game-icon">
                <app-game-icon
                        [game]="game"
                ></app-game-icon>
            </div>
            <div class="game-details d-flex">

                <div class="form-info">
                    <div class="form-group">
                        <label class="form-label">Titel</label>
                        <h4 class="form-heading">{{ game.title }}</h4>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Beschrijving</label>
                        <p class="form-description font-medium-16-24-roboto">{{ game.description }}</p>
                    </div>


                </div>

                <div class="remix-outer">
                    <div class="button-outer">
                        <div class="pos-qr-code-container">
                            <qr-code [value]="getQrCode(game.gameId)" [size]="100"></qr-code>
                        </div>

                        <div class="remix-btn-wrapper">
                            <button mat-flat-button color="primary"
                                    [disabled]="clicked"
                                    (click)="addRun(game.gameId)"
                                    class="remix-btn">nieuwe groep

                            </button>

                            <button mat-flat-button color="primary"
                                    [disabled]="clicked"
                                    class="remix-btn" (click)="remix(game.gameId)">remix
                                <mat-icon class="remix-icon" svgIcon="remix"></mat-icon>
                            </button>
                        </div>
                    </div>


                    <div class="image-container">
                        <div class="image-class">
                            <app-filestore-background-image
                                    [paths]="['/featuredGames/backgrounds/'+game.gameId+'.png']"
                                    (isVideo)="false"
                            >
                            </app-filestore-background-image>
                            <!--                            <app-file-drop-zone-->
                            <!--                                    [customPath]="'/featuredGames/backgrounds/'+(game$|async)?.gameId+'.png'"-->
                            <!--                                    (fileDropped)="handleUploadFile()"-->
                            <!--                                    [isOpen]="true"></app-file-drop-zone>-->
                        </div>
                    </div>

                </div>
            </div>

        </div>
    `,

    styles: [`

        .pos-qr-code-container {
            /*position: absolute;*/
            /*top: 0px;*/
            /*right: 0px;*/
            width: 120px;
            height: 120px;
            background: #FFFFFF 0% 0% no-repeat padding-box;
            box-shadow: 0px 1px 10px #0000001A;
            border-radius: 2px;
            padding: 10px;
        }

        .remix-icon {
            height: 15px;
            width: 18px;
        }

        mat-icon.remix-icon {
            display: inline-flex;
            height: 15px;
            width: 18px;
        }

        mat-icon.remix-icon > svg {
            vertical-align: top;
        }

        .remix-outer {
            display: flex;
            flex-direction: column;
            align-content: flex-end;
            align-items: flex-end;
            width: 418px;
        }

        .button-outer {
            width: 405px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }

        .remix-btn {
            text-transform: uppercase;
            width: 168px;
        }

        .remix-btn-wrapper {
            /*padding-top: 2rem;*/
            margin-bottom: 2rem;
            border-top: 2px solid #f1f1f1;
            width: 168px;
            height: 120px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }


        .image-container {
            width: 405px;
            position: relative;
        }

        .image-class {
            position: absolute;
            width: 405px;
            height: 200px;

        }

        .game {
            padding: 3rem 0;
        }

        .game-details,
        .form-drag-drop {
            flex: 1;
            justify-content: space-between;
        }

        .game-icon {
            width: 68px;
            margin-right: 1rem;
        }


        .game-icon img {
            width: 68px;
        }

        .form-group {
            margin-bottom: 2rem;
        }

        .form-label {
            color: #0000008A;
            font-size: 14px;
            margin: 0 0 0.5rem;
        }

        .form-heading {
            margin: 0;
            font-weight: 400;
        }

        .form-description {
            font-size: 16px;
            color: #000000;
            width: 405px;
        }

        .form-info {
            max-width: 410px;
        }

        .form-group mat-form-field {
            width: 100%;
        }

        .form-drag-drop {
            margin-left: 5rem;
        }

    `],
    encapsulation: ViewEncapsulation.None
})
export class GameLibararyUserViewgameComponent implements OnInit {
    clicked = false;


    game$: Observable<any> = this.store.select(getSelectedGame);

    getQrCode(gameId: number) {
        return environment.deep_link + 'game/' + gameId;
    }

    constructor(
        private router: Router,
        public dialog: MatDialog,
        private store: Store<State>) {
    }

    ngOnInit(): void {
        this.store.dispatch(new GetGameAction());
    }

    remix(gameId): void {
        this.clicked = true;
        this.store.dispatch(new CloneGameRequestAction({gameId: gameId}));
        this.router.navigate(['/portal/root/games']);
    }

    addRun(gameId) {
        const dialogRef = this.dialog.open(NewRunDialogComponent, {
            panelClass: ['modal-fullscreen', "modal-dialog"],
            data: {title: ''}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
            if (result) {
                this.store.dispatch(new CreateRunRequestAction(result));
            }
            this.router.navigate(['/portal/game/' + gameId + '/detail/runs']);

        });
    }
}
