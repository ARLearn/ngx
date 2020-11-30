import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {GameMessage} from "../../../game-messages/store/game-messages.state";
import {getEditMessageSelector} from "../../store/game-message.selector";
import {
    GameMessageClearFileReferenceAction,
    GameMessageUpdateFileReferenceAction
} from "../../store/game-message.actions";
import {Store} from "@ngrx/store";
import {State} from "../../../core/reducers";
import {getGame} from "../../../game-management/store/current-game.selector";
import {GameThemeService} from "../../../core/services/GameThemeService";
import {filter, map, tap} from "rxjs/operators";
import {Game} from "../../../game-management/store/current-game.state";
import {SelectAssetComponent} from "../../../media-library/modal/select-asset/select-asset.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'app-background-image-selector',
    template: `
        <app-asset-selector
                *ngIf="((!(message$|async)?.fileReferences) || (!((message$|async)?.fileReferences[key]))) && (!(hasGameTheme$ | async)); else bg"
                icon="image"
                [title]="'Kies achtergrond'"
                [subtitle]="'jouw startscherm & assets, of'"
                (assetSelect)="attachSplash($event)"
        >
        </app-asset-selector>

        <ng-template #bg>
            <app-filestore-background-image
                    [paths]="[((message$|async)?.fileReferences[key]) || selectedTheme?.backgroundPath]"
                    [deleteButton]="!hideControls && !((!(message$|async)?.fileReferences) || (!((message$|async)?.fileReferences[key])))"
                    [editButton]="!hideControls && ((!(message$|async)?.fileReferences) || (!((message$|async)?.fileReferences[key])))"
                    (delete)="deleteAsset()"
                    (edit)="select()"
                    (loadFailure)="onFail()"
            >
                <ng-content></ng-content>
            </app-filestore-background-image>
        </ng-template>
    `,
    styleUrls: ['./background-image-selector.component.css']
})
export class BackgroundImageSelectorComponent implements OnInit, OnDestroy {
    @Input() hideControls = false;

    @Input() key = 'background';

    message$: Observable<GameMessage> = this.store.select(getEditMessageSelector);
    hasGameTheme$: Observable<boolean> = this.store.select(getGame)
        .pipe(map(game => game && !!game.theme));

    game$: Observable<Game> = this.store.select(getGame);
    selectedTheme;

    private subscription: Subscription;

    constructor(
        public store: Store<State>,
        public dialog: MatDialog,
        public themeService: GameThemeService
    ) {}

    ngOnInit() {
        this.subscription = this.game$.pipe(filter(game => !!game && !!game.theme)).subscribe((game) => {
            this.themeService.getThemes()
                .toPromise()
                .then(themes => {
                    this.selectedTheme = themes.items.find(t => t.themeId === game.theme);
                });
        });
    }

    attachSplash(event) {
        console.log("selected message background is", event)
        const objectRef = {};
        objectRef[this.key] = event;
        this.store.dispatch(new GameMessageUpdateFileReferenceAction({
            delete: false,
            key: this.key,
            value: event
            // fileReferences: objectRef
        }));
    }

    deleteAsset() {
        this.store.dispatch(new GameMessageUpdateFileReferenceAction({
            delete: true,
            key: this.key
        }));
    }

    select() {
        const dialogRef = this.dialog.open(SelectAssetComponent, {
            panelClass: ['modal-fullscreen', "modal-dialog"],
            data: {}
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
            this.attachSplash(result);
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onFail() {
        this.store.dispatch(new GameMessageClearFileReferenceAction(this.key));
    }
}
