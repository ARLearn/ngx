import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {State} from "../../core/reducers";
import {CATEGORY_CUSTOM_THEMES, selectAll, selectThemeCategories} from "../store/game-theme.selectors";
import {BehaviorSubject, combineLatest, Observable, of, Subject, Subscription} from "rxjs";
import {AngularFireStorage} from "angularfire2/storage";
import {GameTheme} from "../store/game-theme.state";
import {distinct, filter, first, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {Actions, ofType} from "@ngrx/effects";
import {GameThemeActionTypes, UpdateOne} from "../store/game-theme.actions";

@Component({
    selector: 'app-select-theme',
    template: `
        <div class="maxwidth pos-top">
            <app-modal-esc-button
                    class="gl-pos-modal-esc-button"
                    [type]="'esc'" (buttonClick)="onNoClick()"></app-modal-esc-button>
            <app-modal-esc-button
                    class="gl-pos-modal-back-button"
                    [type]="'back'" (buttonClick)="onNoClick()"></app-modal-esc-button>
        </div>
        <div class="maxwidth">
            <div class="pos-title primary-color font-medium-32-43-roboto">Choose your theme</div>
            <div class="theme-panel">
                <div class="sidebar">
                    <div *ngFor="let category of (categories$ | async)">
                        <button class="menu-item" [class.selected]="selectedCategory == category"
                                (click)="selectedCategory !== category && selectCategory(category)">{{ category }}</button>
                    </div>
                    <div class="add-btn">
                        <button mat-button color="primary" (click)="createTheme()">
                            <mat-icon>add</mat-icon>
                            Eigen thema
                        </button>
                    </div>
                </div>

                <div class="theme-items" *ngIf="themes$ | async as themes">
                    <div class="theme-item" *ngFor="let theme of themes"
                         [class.theme-item--selected]="selectedTheme?.themeId == theme.themeId" (click)="select(theme)">
                        <span class="selected-icon" *ngIf="selectedTheme?.themeId == theme.themeId"><mat-icon>done</mat-icon></span>
                        <div class="theme-img">
                            <img [src]="theme.backgroundPath | async" alt=""/>
                        </div>
                        <div class="theme-name">
                            {{ theme.name }}
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <mat-toolbar *ngIf="selectedTheme" class="theme-toolbar">
            <div class="maxwidth theme-toolbar-wrapper">
                <div class="theme-info">
                    <div class="image">
                        <img [src]="selectedTheme.backgroundPath | async" alt=""/>
                    </div>
                    <h4>{{ selectedTheme.name }}</h4>
                </div>
                <div>
                    <button mat-button color="primary" *ngIf="isThemeCustom(selectedTheme)" (click)="editTheme()">Edit</button>
                    <button mat-button color="primary" *ngIf="isThemeCustom(selectedTheme)" (click)="deleteTheme()">Delete</button>
                    <button mat-flat-button color="primary" [disabled]="!isThemeComplete(selectedTheme)" (click)="onSubmit()">Ga verder
                    </button>
                </div>
            </div>
        </mat-toolbar>
    `,
    styles: [`
        .pos-top {
            height: 1px;
        }

        .pos-title {
            position: relative;
            margin-top: 83px;
            height: 38px;
            text-align: center;
        }

        .theme-panel {
            display: flex;
            align-items: flex-start;
            margin: 3rem 0 8rem;
        }

        .theme-items {
            display: flex;
            flex-wrap: wrap;
        }

        .theme-item {
            margin-right: 20px;
            margin-bottom: 20px;
            width: 200px;
        }

        .theme-img {
            height: 260px;
        }

        .theme-img img {
            object-fit: cover;
            height: 100%;
            width: 100%;
        }

        .theme-name {
            background-color: #ffffff;
            padding: 0.75rem;
        }

        .theme-item--selected {
            position: relative;
        }

        .theme-item--selected .selected-icon {
            position: absolute;
            top: 0;
            right: 0;
            color: #ffffff;
            height: 24px;
            width: 24px;
            border-bottom-left-radius: 4px;
            background-color: #3EA3DC;
        }

        .selected-icon mat-icon {
            font-size: 16px;
            text-align: center;
            line-height: 24px;
        }

        .sidebar {
            border-right: 1px solid #DDDDDD;
            min-width: 250px;
            padding-right: 20px;
            margin-right: 60px;
        }

        .menu-item {
            background: none;
            outline: none;
            border: none;
            padding: 0.5rem 1rem;
            margin-bottom: 0.15rem;
            cursor: pointer;
        }

        .menu-item.selected {
            font-weight: 700;
            background-color: #ffffff;
        }

        .menu-item:hover {
            background-color: #ffffff;
        }

        .add-btn {
            margin-top: 1rem;
        }

        .theme-toolbar {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: #ffffff;
        }

        .theme-toolbar-wrapper {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
        }

        .theme-toolbar .image {
            height: 100%;
            max-width: 40px;
            margin-right: 20px;
        }

        .theme-toolbar .theme-info {
            display: flex;
            align-items: center;
        }

        .theme-toolbar img {
            height: 100%;
            width: 100%;
            min-height: 70px;
        }
    `]
})
export class SelectThemeComponent implements OnInit, OnDestroy {
    public selectCategory$ = new BehaviorSubject(null);

    public themes$ = this.store.select(selectAll)
        .pipe(
            mergeMap((themes) => this.selectCategory$.pipe(map(cat => [cat, themes]))),
            map(([category, themes]) => {

                return themes.filter(theme => category == null || theme.category == category).map(theme => ({
                    ...theme,
                    backgroundPath: this.getDownloadUrl(theme.backgroundPath),
                    iconPath: this.getDownloadUrl(theme.iconPath),
                }));
            })
        );

    public selectedTheme: any;
    public selectedCategory: any;
    public categories$ = this.store.select(selectThemeCategories);

    private submit$: Subject<GameTheme> = new Subject<GameTheme>();
    private onCreateTheme$: Subject<GameTheme> = new Subject<GameTheme>();
    private onUpdateTheme$: Subject<GameTheme> = new Subject<GameTheme>();
    private onDeleteTheme$: Subject<GameTheme> = new Subject<GameTheme>();

    private subscription = new Subscription();

    get submit() {
        return this.submit$.asObservable();
    }

    get onCreateTheme() {
        return this.onCreateTheme$.asObservable();
    }

    get onUpdateTheme() {
        return this.onUpdateTheme$.asObservable();
    }

    get onDeleteTheme() {
        return this.onDeleteTheme$.asObservable();
    }

    constructor(public dialogRef: MatDialogRef<SelectThemeComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                public store: Store<State>,
                private actionsSubj: Actions,
                private afStorage: AngularFireStorage) {

        const sub = this.actionsSubj.pipe(
            ofType(GameThemeActionTypes.UPDATE_ONE)
        ).subscribe((action: UpdateOne) => {
            this.selectedTheme = action.changes;
            this.selectedTheme.backgroundPath = this.getDownloadUrl(this.selectedTheme.backgroundPath);
            this.selectedTheme.iconPath = this.getDownloadUrl(this.selectedTheme.iconPath);
        });

        this.subscription.add(sub);
    }

    ngOnInit(): void {
        const categorySub = this.categories$.pipe(
            filter(c => c.length > 0),
            first(),
        ).subscribe(([category]) => {
            this.selectCategory(category);
        });

        this.subscription.add(categorySub);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onNoClick() {
        this.dialogRef.close();
    }

    select(theme) {
        this.selectedTheme = theme;
    }

    createTheme() {
        this.onCreateTheme$.next(null);
    }

    editTheme() {
        this.onUpdateTheme$.next(this.selectedTheme);
    }

    deleteTheme() {
        this.onDeleteTheme$.next(this.selectedTheme);
    }

    selectCategory(category) {
        if (this.selectedCategory != category) {
            this.selectedCategory = category;
            this.selectCategory$.next(category);
        } else {
            this.selectedCategory = null;
            this.selectCategory$.next(null);
        }
    }

    isThemeCustom(theme: GameTheme) {
        return theme.category === CATEGORY_CUSTOM_THEMES;
    }

    isThemeComplete(theme: GameTheme) {
        return theme.iconPath && theme.backgroundPath && theme.correctPath && theme.wrongPath;
    }

    onSubmit() {
        this.submit$.next(this.selectedTheme);
    }

    getDownloadUrl(path: string) {
        if (typeof path !== 'string') {
            return path;
        }
        return this.afStorage.ref(path).getDownloadURL().toPromise();
    }
}
