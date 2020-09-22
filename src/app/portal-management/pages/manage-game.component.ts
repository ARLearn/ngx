import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from 'src/app/core/reducers';
import {
    GetCategoriesRequestAction,
    GetPortalGameRequestAction,
    SavePortalGameAction,
    SetFeaturedRequest,
    SetPortalGameCategoryRequest
} from '../store/portal-games.actions';
import {getPortalEditGame} from '../store/portal-games.selector';
import * as fromCategories from '../store/category.selectors';
import {StartUploadAction} from "../../media-library/store/media-lib.actions";
import {MatSelectChange} from "@angular/material/select";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {tap} from "rxjs/operators";

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
<!--                            <p class="form-description">{{ game.description }}</p>-->
                            <mat-form-field>
                                <textarea matInput [(ngModel)]="game.description" mat-autosize></textarea>
                            </mat-form-field>
                            
                            <button color="primary" mat-raised-button (click)="saveDescription(game.description)">Save</button>
                        </div>

                        <div class="form-group">
                            <mat-form-field>
                                <mat-label>{{'PORTAL_MANAGEMENT.GAMES.CATEGORY' |translate}}</mat-label>
                                <mat-select
                                        (selectionChange)="saveCategory($event)"
                                >
                                    <mat-option *ngFor="let category of (categories|async)"
                                                [value]="category.categoryId"
                                    >{{category.title}}</mat-option>
                                    <!--                                    <mat-option>Option 2</mat-option>-->
                                    <!--                                    <mat-option>Option 3</mat-option>-->
                                </mat-select>
                            </mat-form-field>
                        </div>

<!--                        <div class="form-group">-->
<!--                            <mat-form-field>-->
<!--                                <mat-label>{{'CONFIG.SELECT_LANGUAGE' | translate}}</mat-label>-->
<!--                                <mat-select>-->
<!--                                    <mat-option value="nl">{{'CONFIG.LANG.NL' | translate}}</mat-option>-->
<!--                                    <mat-option value="en">{{'CONFIG.LANG.EN'| translate}}</mat-option>-->
<!--                                </mat-select>-->
<!--                            </mat-form-field>-->
<!--                        </div>-->

<!--                        <div class="form-group">-->
<!--                            <label class="form-label">{{'PORTAL_MANAGEMENT.GAMES.USER_ACCESS' |translate}}</label>-->
<!--                            <div>-->
<!--                                <mat-slide-toggle-->
<!--                                        color="primary">{{'PORTAL_MANAGEMENT.GAMES.LOGIN_MANDATORY' | translate}}</mat-slide-toggle>-->
<!--                            </div>-->
<!--                        </div>-->
                    </div>

                    <div class="form-drag-drop">
                        <div class="form-row">
                            <div class="form-group">
                                <label class="form-label">{{'PORTAL_MANAGEMENT.GAMES.FEATURED_IN_LIBRARY' |translate}}</label>
                                <div>
                                    <mat-slide-toggle
                                            [checked]="(game$ |async)?.featured"
                                            (change)="setFeatured($event)"
                                            color="primary">{{'PORTAL_MANAGEMENT.GAMES.FEATURED' |translate}}</mat-slide-toggle>
                                </div>
                            </div>

                            <div>
                                <span><mat-icon class="table-icon" color="primary">star</mat-icon> 4,7</span>
                                <span class="reviews">(11)</span>
                            </div>
                        </div>

                        <div>
                            <app-featured-image-drag-drop
                                    [gameId]="(game$ |async)?.gameId"
                            ></app-featured-image-drag-drop>
<!--                            <app-file-drop-zone-->
<!--                                    [customPath]="'/featuredGames/backgrounds/'+(game$|async)?.gameId+'.png'"-->
<!--                                    (fileDropped)="handleUploadFile()"-->
<!--                                    [isOpen]="true"></app-file-drop-zone>-->
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

        ::ng-deep .game-details .image-class {
            width: 515px;
            height: 245px;
        }
    `]
})
export class ManageGameComponent implements OnInit {
    public game$ = this.store.select(getPortalEditGame).pipe(tap(console.log));
    public categories = this.store.select(fromCategories.selectAll);

    constructor(private store: Store<State>) {
    }

    ngOnInit(): void {
        this.store.dispatch(new GetPortalGameRequestAction());
        this.store.dispatch(new GetCategoriesRequestAction());
    }

    handleUploadFile() {
        console.log("todo handle this event");
        this.store.dispatch(new StartUploadAction());

    }

    saveCategory(event: MatSelectChange) {
        this.game$.subscribe(g => {
            this.store.dispatch(new SetPortalGameCategoryRequest({
                gameId: g.gameId,
                categoryId: event.value
            }));
        }).unsubscribe();

    }

    saveDescription(description: string) {
    //    TODO: API to save description

        this.store.dispatch(new SavePortalGameAction());
    }

    setFeatured(event: MatSlideToggleChange) {
        this.game$.subscribe(g => {
            this.store.dispatch(new SetFeaturedRequest({
                gameId: g.gameId,
                value: event.checked
            }));
        }).unsubscribe();
    }
}
