import {Component, Input, OnInit, OnChanges, SimpleChanges, EventEmitter, Output} from '@angular/core';
import {AngularFireStorage} from "angularfire2/storage";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'app-photo-gallery',
    template: `
    <div class="photo-gallery">
        <div *ngIf="!loading" class="masonry">
            <div
                *ngFor="let img of images; let i = index"
                (click)="showSlider(i, photoPlayer)"
                class="masonry-brick"
            >
                <img [src]="img"  alt="" />

                <div *ngIf="users[img]" class="user-placeholder">
                    <div class="user">
                        <div class="user__avatar">{{ users[img].avatar }}</div>
                        <div class="user__name">{{ users[img].name }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="load-wrapper" *ngIf="loading">
            <span>Loading...</span>
        </div>
    </div>
    <ng-template #photoPlayer>
        <div class="player" (keydown.arrowLeft)="prevImg()" (keydown.arrowRight)="nextImg()">
            <div class="player__image">
               <img [src]="images[selectedIdx]" alt="">
            </div>
            <div class="player__content">
                <div class="player__actions">
                    <div class="player__arrows">
                        <button mat-icon-button (click)="prevImg()"><i class="fas fa-arrow-left"></i></button>
                        <button mat-icon-button (click)="nextImg()"><i class="fas fa-arrow-right"></i></button>
                    </div>
                    <div class="player__close">
                        <button mat-icon-button (click)="closeModal()"><i class="fas fa-times"></i></button>
                    </div>
                </div>
                <div class="player__text">
                    description
                </div>
                <div class="player__user">
                    <div class="user" *ngIf="users[images[selectedIdx]]">
                        <div class="user__avatar">{{ users[images[selectedIdx]].avatar }}</div>
                        <div class="user__name">{{ users[images[selectedIdx]].name }}</div>
                    </div>
                </div>
            </div>
        </div>
    </ng-template>
    `,
    styles: [`
        .masonry {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(122px, 1fr));
            grid-auto-flow: row dense;
            grid-gap: 10px;
        }

        .masonry-brick {
            position: relative;
            aspect-ratio: 1 / 1;
        }

        .masonry-brick .user-placeholder {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: none;
            align-items: flex-end;
            background: linear-gradient(0deg, rgba(49,49,49,1) 0%, rgba(255,255,255,0) 100%);
        }

        .masonry-brick:hover .user-placeholder {
            display: flex;
        }

        .masonry-brick img {
            height: 100%;
            width: 100%;
            object-fit: cover;
        }

        .user {
            display: flex;
            align-items: center;
            padding: 10px;
            overflow: hidden;
            width: 100%;
        }

        .user__avatar {
            height: 23px;
            width: 23px;
            min-width: 23px;
            background-color: #DFE4E6;
            border-radius: 50%;
            line-height: 24px;
            font-size: 12px;
            text-align: center;
            margin-right: 6px;
            color: rgba(0,0,0,0.6);
        }

        .user__name {
            color: #ffffff;
            font-size: 12px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }

        .photo-gallery {
            width: 100%;
            padding: 4px;
            background-color: #ffffff;
            height: 100%;
        }

        .load-wrapper {
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .player-bg .mat-dialog-container {
            background-color: #ffffff !important;
        }
        .player {
            display: flex;
        }

        .player__image img {
            min-width: 360px;
            aspect-ratio: 1 / 1;
            width: 100%;
        }

        .player__content {
            min-width: 200px;
            margin-left: 30px;
            display: flex;
            flex-direction: column;
        }

        .player__actions {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-bottom: 8px;
            margin-bottom: 8px;
            border-bottom: 1px solid rgba(0,0,0,0.12);
        }

        .player__arrows > * {
            margin-right: 10px;
        }

        .player__text {
            flex: 1;
        }

        .player__user {
            padding-top: 8px;
            margin-top: 8px;
            border-top: 1px solid rgba(0,0,0,0.12);
        }

        .player__user .user {
            padding: 0;
        }

        .player__user .user__avatar {
            margin-right: 10px;
        }

        .player__user .user__name {
            color: rgba(0,0,0,0.54);
        }
    `]
})
export class PhotoGalleryComponent implements OnInit, OnChanges {
    public options = {};
    @Input() user: any;
    @Input() responses: any = [];
    public images = [];
    public users = {};
    public loading = false;
    public selectedIdx: any;

    private dialogRef;

    @Output() public onLoad: EventEmitter<any> = new EventEmitter<any>();


    constructor(
        public afStorage: AngularFireStorage,
        public dialog: MatDialog,
    ) {}

    async ngOnInit(): Promise<void> {
        await this.loadPhotos();
    }

    async ngOnChanges(changes: SimpleChanges) {
        if (
            (changes.responses && this.hasChanged(changes.responses.previousValue, changes.responses.currentValue)) ||
            changes.user && ((changes.user.currentValue && !changes.user.previousValue) ||
            (changes.user.currentValue && changes.user.previousValue &&
            changes.user.currentValue.fullId !== changes.user.previousValue.fullId))
        ) {
            await this.loadPhotos();
        }
    }

    public showSlider(idx, player) {
        this.selectedIdx = idx;

        this.dialogRef = this.dialog.open(player, {
            panelClass: 'player-bg'
        });
    }

    public prevImg() {
        if (this.selectedIdx === 0) {
            this.selectedIdx = this.images.length - 1;
        } else {
            this.selectedIdx--;
        }
    }

    public nextImg() {
        if (this.selectedIdx === this.images.length - 1) {
            this.selectedIdx = 0;
        } else {
            this.selectedIdx++;
        }
    }

    public closeModal() {
        this.dialogRef.close();
    }

    public async loadPhotos() {
        if (this.loading) {
            return;
        }

        this.loading = true;
        this.onLoad.emit(true);
        this.images = [];
        this.users = {};
        this.options = {};
        for (const response of this.responses) {
            const url = await this.afStorage.ref(response.responseValue).getDownloadURL().toPromise();
            this.images.push(url);
            this.users[url] = response.user;
        }

        this.loading = false;
        this.onLoad.emit(false);
    }

    private hasChanged(previousResponses: any[], currentResponses: any[]) {
        if (!previousResponses && currentResponses) {
            return true;
        }

        if (previousResponses.length !== currentResponses.length) {
            return true;
        }

        return currentResponses.some(response => {
            return previousResponses.every(prev => prev.responseValue !== response.responseValue)
        });
    }

}
