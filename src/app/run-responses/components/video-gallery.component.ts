import {
    Component,
    Input,
    OnInit,
    OnChanges,
    SimpleChanges,
    EventEmitter,
    Output,
    ViewEncapsulation,
    ViewChild,
    AfterViewChecked,
    HostListener
} from '@angular/core';
import {AngularFireStorage} from "angularfire2/storage";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-video-gallery',
    template: `
    <div class="video-gallery">
        <div class="video-gallery__wrapper" *ngIf="!loading">
            <div class="video-item" *ngFor="let video of videos; let i = index" (click)="showVideo(i, videoPlayer)">
                <video class="video-el" [src]="video.url"></video>
                <span class="video-icon"><i class="fas fa-play"></i></span>
                <div *ngIf="users[video]" class="user-placeholder">
                    <div class="user">
                        <div class="user__avatar">{{ users[video.url].avatar }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="load-wrapper" *ngIf="loading">
            <span>Loading...</span>
        </div>
    </div>
    <ng-template #videoPlayer>
        <div class="player">
            <div class="player__video">
                <video controls autoplay #video (loadedmetadata)="video.muted = true">
                    <source [src]="selectedVideo.url" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
            <div class="player__content">
                <div class="player__actions">
                    <div class="player__arrows">
                        <button mat-icon-button (click)="prevVideo(video)"><i class="fas fa-arrow-left"></i></button>
                        <button mat-icon-button (click)="nextVideo(video)"><i class="fas fa-arrow-right"></i></button>
                    </div>
                    <div class="player__close">
                        <button mat-icon-button (click)="close()"><i class="fas fa-times"></i></button>
                    </div>
                </div>
                <div class="player__text">
                    description
                </div>
                <div class="player__user">
                    <div class="user">
                        <div class="user__avatar">{{ users[selectedVideo.url]?.avatar }}</div>
                        <div class="user__name">{{ users[selectedVideo.url]?.name }}</div>
                    </div>
                </div>
            </div>
        </div>
    </ng-template>
    `,
    styles: [`
        .player-bg .mat-dialog-container {
            background-color: #ffffff !important;
        }
        .player {
            display: flex;
        }
        
        .player__video video {
            width: 360px;
            min-height: 470px;
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
        
        .video-item {
            position: relative;
            cursor: pointer;
        }
        .video-item .user-placeholder {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 48px;
            display: none;
            align-items: flex-end;
        }
        
        .video-icon {
            position: absolute;
            top: 7px;
            right: 10px;
            color: #ffffff;
        }

        .video-item:hover .user-placeholder {
            display: flex;
        }
        
        .video-el {
            width: 100%;
        }

        .user {
            display: flex;
            align-items: center;
            padding: 6px;
        }

        .user__avatar {
            height: 30px;
            width: 30px;
            background-color: #ffffff;
            border-radius: 50%;
            line-height: 31px;
            font-size: 12px;
            text-align: center;
            color: rgba(0,0,0,0.6);
        }

        .player__user .user__avatar {
            background-color: #DFE4E6;
        }

        .video-gallery {
            min-height: 100%;
            width: 100%;
            background-color: #ffffff;
            padding: 8px;
        }

        .video-gallery__wrapper {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
            grid-gap: 8px;
        }

        .load-wrapper {
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class VideoGalleryComponent implements OnInit, OnChanges {
    @Input() user: any;
    @Input() responses: any;
    public users = {};
    public videos: any[];
    public selectedVideo: any;
    public loading = false;
    @Output() public onLoad: EventEmitter<any> = new EventEmitter<any>();
    private dialogRef;
    private selectedVideoIdx: any;

    @ViewChild('video') videoPlayer;

    constructor(
        public afStorage: AngularFireStorage,
        public dialog: MatDialog,
    ) {}

    async ngOnInit(): Promise<void> {
        await this.loadVideos();
    }

    async ngOnChanges(changes: SimpleChanges) {
        
        if (
            (changes.responses && this.hasChanged(changes.responses.previousValue, changes.responses.currentValue)) ||
            changes.user && ((changes.user.currentValue && !changes.user.previousValue) ||
            (changes.user.currentValue && changes.user.previousValue &&
            changes.user.currentValue.fullId !== changes.user.previousValue.fullId))
        ) {
            await this.loadVideos();
        }
        
    }

    public async loadVideos() {
        if (!this.responses || this.loading) {
            this.videos = [];
            this.users = {};
            return;
        }

        this.loading = true;
        this.onLoad.emit(true);
        this.videos = [];
        this.users = {};
        let i = 0;
        for (const response of this.responses) {
            const url = await this.afStorage.ref(response.responseValue).getDownloadURL().toPromise();
            this.videos.push({ id: i++, url });
            this.users[url] = response.user;
        }

        this.loading = false;
        this.onLoad.emit(false);
    }

    @HostListener('window:keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        if (event.code === 'ArrowLeft') {
            this.prevVideo(this.videoPlayer.nativeElement);
        }
        if (event.code === 'ArrowRight') {
            this.nextVideo(this.videoPlayer.nativeElement);
        }
    }

    public showVideo(videoIdx, player) {
        this.selectedVideoIdx = videoIdx;
        this.selectedVideo = this.videos[videoIdx];

        this.dialogRef = this.dialog.open(player, {
            panelClass: 'player-bg'
        });
    }

    public prevVideo(videoRef) {
        if (this.selectedVideoIdx === 0) {
            this.selectedVideoIdx = this.videos.length - 1;
        } else {
            this.selectedVideoIdx--;
        }

        this.selectedVideo = this.videos[this.selectedVideoIdx];
        this.playVideo(videoRef);
    }

    public nextVideo(videoRef: HTMLVideoElement) {
        if (this.selectedVideoIdx === this.videos.length - 1) {
            this.selectedVideoIdx = 0;
        } else {
            this.selectedVideoIdx++;
        }

        this.selectedVideo = this.videos[this.selectedVideoIdx];
        this.playVideo(videoRef);
    }

    playVideo(videoRef: HTMLVideoElement) {
        videoRef.src = this.selectedVideo.url;
        videoRef.load();
        videoRef.play();
    }

    public close() {
        this.dialogRef.close();
    }

    private hasChanged(previousResponses: any[], currentResponses: any[]) {
        if (!previousResponses || !currentResponses) {
            return true;
        }

        if (previousResponses && previousResponses.length !== currentResponses.length) {
            return true;
        }

        return currentResponses.some(response => {
            return previousResponses.every(prev => prev.responseValue !== response.responseValue)
        });
    }
}
