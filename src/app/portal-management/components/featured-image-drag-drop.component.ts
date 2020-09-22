import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {
    MediaLibraryActionTypes,
    StartUploadAction
} from "../../media-library/store/media-lib.actions";
import {ActionsSubject, Store} from "@ngrx/store";
import {State} from "../../core/reducers";
import {ofType} from "@ngrx/effects";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-featured-image-drag-drop',
    template: `


        <!--        <div class="form-row">-->
        <!--            <div class="form-group">-->
        <!--                <label class="form-label">{{'PORTAL_MANAGEMENT.GAMES.FEATURED_IN_LIBRARY' |translate}}</label>-->
        <!--                <div>-->
        <!--                    <mat-slide-toggle color="primary">{{'PORTAL_MANAGEMENT.GAMES.FEATURED' |translate}}</mat-slide-toggle>-->
        <!--                </div>-->
        <!--            </div>-->

        <!--            <div>-->
        <!--                <span><mat-icon class="table-icon" color="primary">star</mat-icon> 4,7</span>-->
        <!--                <span class="reviews">(11)</span>-->
        <!--            </div>-->
        <!--        </div>-->

        <div>
            <div class="image-class" *ngIf="imageExists">
                <button color="warn" mat-raised-button class="btn-delete" (click)="deleteImage()"><mat-icon>delete</mat-icon></button>
                <app-filestore-background-image
                        (loadFailure)="($event == null)? imageExists= $event:null"
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
        private actionsSubj: ActionsSubject
    ) {
        this.subscription = this.actionsSubj.pipe(
            ofType(MediaLibraryActionTypes.COMPLETED_UPLOAD)
        )
            .subscribe(() => this.imageExists = true);
    }

    ngOnInit(): void {}

    handleUploadFile() {
        console.log("todo handle this event");
        this.store.dispatch(new StartUploadAction());

    }

    deleteImage() {
        // TODO: make deleting file
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
