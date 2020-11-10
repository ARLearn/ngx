import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {Observable, Subscription} from "rxjs";
import {filter, withLatestFrom} from 'rxjs/operators';
import {AngularFireStorage} from "angularfire2/storage";

import {State} from "../../core/reducers";
import {SelectThemeComponent} from "../../game-themes/modal/select-theme.component";
import {
    CreateRequest, CreateRequestSuccess, DeleteOne,
    GameThemeActionTypes,
    Query,
    UpdateRequest
} from "../../game-themes/store/game-theme.actions";
import {SetSelectedThemeAction} from '../store/current-game.actions';
import {getSelectedTheme} from "../store/current-game.selector";
import {selectAll} from 'src/app/game-themes/store/game-theme.selectors';
import {CreateThemeNameModalComponent} from "../../game-themes/modal/create-theme/create-theme-name-modal.component";
import {CreateThemeSettingsComponent} from "../../game-themes/modal/create-theme/create-theme-settings.component";
import {getCurrentUser} from "../../auth/store/auth.selector";
import {Actions, ofType} from "@ngrx/effects";
import {DeleteThemeComponent} from "../../game-themes/modal/create-theme/delete-theme.component";

@Component({
    selector: 'app-game-theme-selector',
    template: `
        <ng-container *ngIf="selectedTheme">
            <div class="game-theme-selector full">
                <div class="theme-wrapper">
                    <div class="theme-background">
                        <img [src]="selectedTheme.backgroundPath | async" alt=""/>
                    </div>

                    <div class="colors">
                        <div class="primary-color">
                            <app-color-input
                                    [label]="'COMMON.PRIMARY_COLOR'|translate"
                                    [color]="selectedTheme.primaryColor"
                                    [canEdit]="false"
                                    (onChange)="primColorChange($event)"
                            ></app-color-input>
                        </div>

                        <!--                        <div class="secondary-color">-->
                        <!--                            <app-color-input-->
                        <!--                                    [label]="'COMMON.SECONDARY_COLOR'|translate"-->
                        <!--                                    [color]="selectedTheme.primaryColor"-->
                        <!--                                    [canEdit]="true"-->
                        <!--                                    (onChange)="primColorChange($event)"-->
                        <!--                            ></app-color-input>-->
                        <!--                        </div>-->

                        <div class="theme-icon">
                            <div>
                                <label>{{'COMMON.ICON_IMAGE'|translate}}</label>
                            </div>
                            <div class="theme-icon__img">
                                <img [src]="selectedTheme.iconPath | async" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="theme-btn-wrapper">
                    <button mat-flat-button color="primary" class="theme-btn"
                            (click)="openSelectModal(selectedTheme)">{{'GAME.SWITCH_THEME'|translate}}</button>
                </div>
            </div>
        </ng-container>
    `,
    styles: [
            `
            .game-theme-selector {
                background-color: #FAFAFA;
                text-align: center;
                max-width: 290px;
            }

            .game-theme-selector.full {
                max-width: 85%;
                margin: auto;
            }

            .game-theme-selector-icon {
                color: #E4E9EB;
                font-size: 102px;
                width: 100%;
                margin-bottom: 7rem;
            }

            .game-theme-selector-title {
                margin-bottom: 1rem;
                opacity: 0.5;
            }

            .game-theme-selector-description {
                color: #00000060;
            }

            .theme-btn {
                text-transform: uppercase;
            }

            .theme-wrapper {
                display: flex;
                align-items: flex-start;
            }

            .theme-background {
                width: 160px;
                height: 246px;
                margin-right: 2rem;
            }

            .colors {
                width: 300px;
            }

            .theme-background img {
                height: 100%;
                width: 100%;
                object-fit: cover;
            }

            .secondary-color {
                margin-top: 5rem;
            }

            .theme-btn-wrapper {
                padding-top: 2rem;
                margin-top: 2rem;
                border-top: 2px solid #f1f1f1;
            }

            .theme-icon {
                margin-top: 10rem;
                text-align: left;
            }

            .theme-icon label {
                color: #0000008A;
            }

            .theme-icon__img {
                height: 54px;
                width: 54px;
            }

            .theme-icon__img img {
                height: 100%;
                width: 100%;
                border-radius: 10px;
            }
        `
    ]
})
export class GameThemeSelectorComponent implements OnInit, OnDestroy {
    public theme$ = this.store.select(getSelectedTheme) as Observable<number>;
    public themes$ = this.store.select(selectAll) as Observable<any>;
    public selectedTheme: any;

    private user$: Observable<any> = this.store.select(getCurrentUser);

    private subscription: Subscription = new Subscription();
    private currentUserId;
    private dialogNameThemeRef: any;

    constructor(
        private store: Store<State>,
        public dialog: MatDialog,
        private afStorage: AngularFireStorage,
        private actionSubj: Actions,
    ) {
        const sub = this.actionSubj.pipe(
            ofType(GameThemeActionTypes.CREATE_REQUEST_SUCCESS),
        ).subscribe((action: CreateRequestSuccess) => {
            this.openThemeSettingsModal(action.payload);
            this.dialogNameThemeRef.close();
        });

        this.subscription.add(sub);
    }

    ngOnInit(): void {
        this.subscription.add(this.user$.subscribe((user) => this.currentUserId = user.uid));

        this.store.dispatch(new Query());

        this.subscription.add(this.themes$.subscribe(themes => {
            if (!this.selectedTheme) {
                this.selectedTheme = {...themes.find(t => t.themeId == '1')};

                if (this.selectedTheme) {
                    this.selectedTheme.backgroundPath = this.getDownloadUrl(this.selectedTheme.backgroundPath);
                    this.selectedTheme.iconPath = this.getDownloadUrl(this.selectedTheme.iconPath);
                }
            }
        }));

        this.subscription.add(this.theme$.pipe(
            withLatestFrom(this.themes$),
            filter(([_, themes]) => themes && themes.length)
        ).subscribe(([theme, themes]) => {
            this.selectedTheme = {...themes.find(t => t.themeId == theme)};

            if (this.selectedTheme) {
                this.selectedTheme.backgroundPath = this.getDownloadUrl(this.selectedTheme.backgroundPath);
                this.selectedTheme.iconPath = this.getDownloadUrl(this.selectedTheme.iconPath);
            }
        }));
    }

    openSelectModal(theme = null) {
        const dialogRef = this.dialog.open(SelectThemeComponent, {
            panelClass: ['modal-fullscreen', "modal-dialog"],
            data: {}
        });

        dialogRef.componentInstance.selectedTheme = theme;

        this.subscription.add(dialogRef.componentInstance.submit
            .subscribe((theme) => {
                this.store.dispatch(new SetSelectedThemeAction(theme));

                dialogRef.close();
            }));

        this.subscription.add(
            dialogRef.componentInstance.onCreateTheme.subscribe(() => {
                this.openCreateThemeModal();
            })
        );

        this.subscription.add(
            dialogRef.componentInstance.onDeleteTheme.subscribe((toDeleteTheme) =>{
                this.deleteThemeModal(toDeleteTheme);
            })
        );

        this.subscription.add(
            dialogRef.componentInstance.onUpdateTheme.subscribe((toEditTheme) => {
                this.openThemeSettingsModal(toEditTheme);
            })
        );
    }

    openCreateThemeModal() {
        this.dialogNameThemeRef = this.dialog.open(CreateThemeNameModalComponent, {
            panelClass: ['modal-fullscreen', "modal-dialog"],
            data: {}
        });

        this.subscription.add(
            this.dialogNameThemeRef.componentInstance.submit.subscribe(payload => {
                this.store.dispatch(new CreateRequest(payload));
            })
        );
    }

    openThemeSettingsModal(theme) {
        const dialogRef = this.dialog.open(CreateThemeSettingsComponent, {
            panelClass: ['modal-fullscreen', "modal-dialog"],
            data: {}
        });

        dialogRef.componentInstance.theme = {...dialogRef.componentInstance.theme, ...theme, fullAccount: this.currentUserId};

        this.subscription.add(
            dialogRef.componentInstance.submit.subscribe((payload) => {
                this.store.dispatch(new UpdateRequest(payload));
                dialogRef.close();
            })
        );
    }

    deleteThemeModal(theme) {
        const dialogRef = this.dialog.open(DeleteThemeComponent, {
            panelClass: ['modal-fullscreen', "modal-dialog"],
            data: {}
        });

        dialogRef.componentInstance.theme = {...dialogRef.componentInstance.theme, ...theme, fullAccount: this.currentUserId};

        this.subscription.add(
            dialogRef.componentInstance.submit.subscribe((payload) => {
                this.store.dispatch(new DeleteOne(payload.themeId));
                dialogRef.close();
            })
        );
    }

    primColorChange(event) {
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    getDownloadUrl(path: string) {
        if (typeof path !== 'string') {
            return path;
        }
        return this.afStorage.ref(path).getDownloadURL().toPromise();
    }
}
