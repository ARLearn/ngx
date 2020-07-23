import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {State} from "../../core/reducers";
import {SelectThemeComponent} from "../../game-themes/modal/select-theme.component";
import {Query} from "../../game-themes/store/game-theme.actions";
import {SetSelectedThemeAction, SetSelectedThemeOptionsAction} from '../store/current-game.actions';
import {getSelectedTheme} from "../store/current-game.selector";
import {Observable, Subject} from "rxjs";
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-game-theme-selector',
    template: `
        <ng-container *ngIf="theme$ | async as theme; else selectThemeRef">
            <div class="game-theme-selector full">
                <div class="theme-wrapper">
                    <div class="theme-background">
                        <img [src]="theme.backgroundPath | async" alt="" />
                    </div>
                    
                    <div class="colors">
                        <div class="primary-color">
                            <app-color-input
                                    [label]="'COMMON.PRIMARY_COLOR'|translate"
                                    [color]="theme.primaryColor"
                                    [canEdit]="true"
                                    (onChange)="primColorChange($event)"
                            ></app-color-input>
                        </div>
                        
                        <div class="secondary-color">
                            <app-color-input
                                    [label]="'COMMON.SECONDARY_COLOR'|translate"
                                    [color]="theme.primaryColor"
                                    [canEdit]="true"
                                    (onChange)="primColorChange($event)"
                            ></app-color-input>
                        </div>
                        
                        <div class="theme-icon">
                            <div>
                                <label>Icon afbeelding</label>
                            </div>
                            <div class="theme-icon__img">
                                <img [src]="theme.iconPath | async" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="theme-btn-wrapper">
                    <button mat-flat-button color="primary" class="theme-btn" (click)="openSelectModal(theme)">Aanpassent</button>
                </div>
            </div>
        </ng-container>
        
        <ng-template #selectThemeRef>
            <div class="game-theme-selector">
                <mat-icon class="game-theme-selector-icon">image</mat-icon>
                <h3 class="game-theme-selector-title">Kies jouw thema</h3>
                <p class="game-theme-selector-description">Kies een standaard thema of maak jouw eigen thema</p>
                <button class="theme-btn" mat-raised-button color="primary" (click)="openSelectModal()">Select theme</button>
            </div>
        </ng-template>
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
    public theme$ = this.store.select(getSelectedTheme) as Observable<any>;

    private unsubscribe$: Subject<void> = new Subject<void>();

    constructor(
        private store: Store<State>,
                public dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.store.dispatch(new Query());
    }

    openSelectModal(theme = null) {
        const dialogRef = this.dialog.open(SelectThemeComponent, {
            panelClass: ['modal-fullscreen', "modal-dialog"],
            data: {}
        });

        dialogRef.componentInstance.selectedTheme = theme;

        dialogRef.componentInstance.submit
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((theme) => {
                this.store.dispatch(new SetSelectedThemeAction(theme));
                this.dialog.closeAll();
            });
    }

    primColorChange(event) {
        this.store.dispatch(new SetSelectedThemeOptionsAction({ primaryColor: event }));
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
