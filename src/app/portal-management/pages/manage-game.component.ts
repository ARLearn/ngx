import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from 'src/app/core/reducers';
import {GetPortalGameRequestAction} from '../store/portal-games.actions';
import {getPortalEditGame, getPortalGame} from '../store/portal-games.selector';
import {StartUploadAction} from "../../media-library/store/media-lib.actions";

@Component({
    selector: 'app-manage-game',
    template: `
        <app-top-level-navbar [backUrl]="'/portal/root/portal'" [title]="(game$ | async)?.title">
        </app-top-level-navbar>
        <div class="game maxwidth d-flex" *ngIf="game$ | async as game">
            <div class="game-icon">
                <img [src]="'/assets/images/games/' + game.icon + '.png'" alt="game"/>
            </div>
            <div class="game-details">
                <div class="d-flex">
                    <div class="form-info">
                        <div class="form-group">
                            <label class="form-label">Titel</label>
                            <h4 class="form-heading">{{ game.title }}</h4>
                        </div>

                        <div class="form-group">
                            <label class="form-label">Beschrijving</label>
                            <p class="form-description">{{ game.description }}</p>
                        </div>

                        <div class="form-group">
                            <mat-form-field>
                                <mat-label>{{'PORTAL_MANAGEMENT.GAMES.CATEGORY' |translate}}</mat-label>
                                <mat-select>
                                    <mat-option>Option 1</mat-option>
                                    <mat-option>Option 2</mat-option>
                                    <mat-option>Option 3</mat-option>
                                </mat-select>
                            </mat-form-field>
                        </div>

                        <div class="form-group">
                            <mat-form-field>
                                <mat-label>{{'CONFIG.SELECT_LANGUAGE' | translate}}</mat-label>
                                <mat-select>
                                    <mat-option value="nl">{{'CONFIG.LANG.NL' | translate}}</mat-option>
                                    <mat-option value="en">{{'CONFIG.LANG.EN'| translate}}</mat-option>
                                </mat-select>
                            </mat-form-field>
                        </div>

                        <div class="form-group">
                            <label class="form-label">{{'PORTAL_MANAGEMENT.GAMES.USER_ACCESS' |translate}}</label>
                            <div>
                                <mat-slide-toggle
                                        color="primary">{{'PORTAL_MANAGEMENT.GAMES.LOGIN_MANDATORY' | translate}}</mat-slide-toggle>
                            </div>
                        </div>
                    </div>

                    <div class="form-drag-drop">
                        <div class="form-row">
                            <div class="form-group">
                                <label class="form-label">{{'PORTAL_MANAGEMENT.GAMES.FEATURED_IN_LIBRARY' |translate}}</label>
                                <div>
                                    <mat-slide-toggle color="primary">{{'PORTAL_MANAGEMENT.GAMES.FEATURED' |translate}}</mat-slide-toggle>
                                </div>
                            </div>

                            <div>
                                <span><mat-icon class="table-icon" color="primary">star</mat-icon> 4,7</span>
                                <span class="reviews">(11)</span>
                            </div>
                        </div>

                        <div>
                            <app-file-drop-zone
                                    [customPath]="'/featuredGames/backgrounds/'+(game$|async)?.gameId+'.png'"
                                    (fileDropped)="handleUploadFile()"
                                    [isOpen]="true"></app-file-drop-zone>
                        </div>

                    </div>
                </div>
                <div class="photos">
                    <div>
                        <img src="/assets/images/games/phone1.png" alt=""/>
                    </div>

                    <div>
                        <img src="/assets/images/games/phone2.png" alt=""/>
                    </div>

                    <div>
                        <img src="/assets/images/games/phone3.png" alt=""/>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .game {
            padding: 3rem 0;
        }

        .game-details,
        .form-drag-drop {
            flex: 1;
        }

        .game-icon {
            width: 68px;
            margin-right: 1rem;
        }

        .table-icon {
            font-size: 16px;
            height: unset;
            width: unset;
            vertical-align: text-top;
        }

        .reviews {
            margin-left: 10px;
            color: #000000DE;
            opacity: 0.5;
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

        .form-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .photos {
            display: flex;
            flex-wrap: wrap;
        }

        .photos > * {
            margin-right: 1rem;
            margin-bottom: 1rem;
        }
    `]
})
export class ManageGameComponent implements OnInit {
    public game$ = this.store.select(getPortalEditGame);

    constructor(private store: Store<State>) {
    }

    ngOnInit(): void {
        this.store.dispatch(new GetPortalGameRequestAction());
    }

    handleUploadFile() {
        console.log("todo handle this event");
        this.store.dispatch(new StartUploadAction());

    }
}
