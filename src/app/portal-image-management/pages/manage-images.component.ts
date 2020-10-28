import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from "@ngrx/store";
import { MatDialog } from "@angular/material/dialog";
import {Subject, Subscription} from "rxjs";

import { State } from "../../core/reducers";
import {CreateImage, Query} from "../store/portal-images.actions";
import { PortalImage } from "../store/portal-images.state";
import {ImageFormModalComponent} from "../modals/image-form.modal";
import {withLatestFrom} from "rxjs/operators";
import {getSelectedFolder} from "../store/portal-images.selectors";

@Component({
    selector: 'app-manage-images',
    template: `
        <app-top-level-navbar [title]="'Portal Images'">
            <app-subtabs-navbar [items]="subMenuItems"></app-subtabs-navbar>

            <div class="button-placeholder">
                <div class="button-center">
                    <button color="accent" mat-fab (click)="addImage()">
                        <mat-icon>add</mat-icon>
                    </button>
                </div>
            </div>
        </app-top-level-navbar>
        
        <div class="maxwidth files-viewer">
            <app-media-gallery-container></app-media-gallery-container>
        </div>
    `,
    styles: [`
        .files-viewer {
            margin-top: 40px;
        }

    `]
})
export class ManageImagesComponent implements OnInit, OnDestroy {
    private subscription = new Subscription();
    private addImage$ = new Subject();


    subMenuItems = [
        {
            routerLink: '/portal/root/portal',
            label: 'COMMON.GAMES'
        },
        {
            routerLink: '/portal/root/usrmgt',
            label: 'PORTAL_MANAGEMENT.USERS.MENU'
        },
        {
            routerLink: '/portal/root/images',
            label: 'PORTAL_MANAGEMENT.IMAGES.MENU'
        },
    ];

    constructor(
        public dialog: MatDialog,
        private store: Store<State>,
    ) {

        const sub = this.addImage$.pipe(withLatestFrom(this.store.select(getSelectedFolder))).subscribe(([, folder]) => {
            const dialogRef = this.dialog.open(ImageFormModalComponent, {
                panelClass: ['modal-fullscreen', "modal-dialog"],
                data: {}
            });

            dialogRef.componentInstance.image.path = folder ? folder.path.replace('mediaLibrary/', '') : '/'

            dialogRef.componentInstance.submit.subscribe((image: PortalImage) => {
                this.store.dispatch(new CreateImage(image));

                dialogRef.close();
            });
        });

        this.subscription.add(sub);
    }

    click(item) {
        console.log(item);
    }

    ngOnInit(): void {
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    addImage() {
        console.log('add image');
        this.addImage$.next();

    }

    deleteImage(imageId: string) {

    }
}
