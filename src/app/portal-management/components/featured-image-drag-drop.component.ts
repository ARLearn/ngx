import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {
    MediaLibraryActionTypes,
    StartUploadAction
} from "../../media-library/store/media-lib.actions";
import {ActionsSubject, Store} from "@ngrx/store";
import {State} from "../../core/reducers";
import {ofType} from "@ngrx/effects";
import {Subscription} from "rxjs";
import {DeleteFeaturedGameImageRequest, PortalGamesActionTypes} from "../store/portal-games.actions";
import {delay} from "rxjs/operators";
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
    selector: 'app-featured-image-drag-drop',
    template: `
        <div>
            <div class="image-class" *ngIf="imageExists">
                <button color="warn" mat-raised-button class="btn-delete" (click)="deleteImage()"><mat-icon>delete</mat-icon></button>
                <app-filestore-background-image
                        (loadFailure)="($event == null) ? imageExists = $event : null"
                        [paths]="['/featuredGames/backgrounds/'+gameId+'.png']"
                        (isVideo)="false"
                >
                </app-filestore-background-image>
            </div>
            <app-file-drop-zone *ngIf="!imageExists"
                                [customPath]="'/featuredGames/backgrounds/'+gameId+'.png'"
                                (fileDropped)="handleUploadFile()"
                                [isOpen]="true"></app-file-drop-zone>
        </div>
    `,
    styles: [
            `
            .image-class {
                position: absolute;
                width: 418px;
                height: 200px;
                background-color: #1b77c5;
            }
            
            .btn-delete {
                position: absolute;
                top: 10px;
                right: 10px;
                z-index: 1;
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

            .form-drag-drop {
                flex: 1;
            }

            .form-drag-drop {
                margin-left: 5rem;
            }

            .form-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        `
    ]
})
export class FeaturedImageDragDropComponent implements OnInit, OnDestroy {
    @Input() gameId;

    imageExists: boolean= true;

    private subscription: Subscription;

    constructor(
        private store: Store<State>,
        private actionsSubj: ActionsSubject,
    ) {
        this.subscription = this.actionsSubj.pipe(
            ofType(MediaLibraryActionTypes.COMPLETED_UPLOAD),
            delay(2000)
        )
            .subscribe(() => {
                this.imageExists = true;
            });

        this.subscription.add(this.actionsSubj.pipe(
            ofType(PortalGamesActionTypes.DELETE_FEATURED_GAME_IMAGE_RESPONSE)
        )
            .subscribe(() => this.imageExists = false));
    }

    ngOnInit(): void {}

    handleUploadFile() {
        this.store.dispatch(new StartUploadAction());

    }

    deleteImage() {
        this.store.dispatch(new DeleteFeaturedGameImageRequest({
            gameId: this.gameId
        }))
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
