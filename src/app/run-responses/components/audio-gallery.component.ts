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
    AfterViewChecked
} from '@angular/core';
import {AngularFireStorage} from "angularfire2/storage";

@Component({
    selector: 'app-audio-gallery',
    template: `
        <div class="audio-gallery">
            <div class="audio-gallery__wrapper" *ngIf="!loading" #audioEls>
                <div class="audio-item" *ngFor="let audio of audios" [id]="audio.id">
                    <span class="audio-item__title">{{"MESSAGE.RECORDING" |translate}}</span>

<!--                    <mat-basic-audio-player-->
<!--                            [audioUrl]="audio.url"-->
<!--                            [title]="'title'"-->
<!--                            [autoPlay]="false"-->
<!--                            muted="muted"-->
<!--                            [displayVolumeControls]="true"-->
<!--                    ></mat-basic-audio-player>-->

                    <div *ngIf="users[audio]" class="user-placeholder">
                        <div class="user">
                            <div class="user__avatar">{{ users[audio.url].avatar }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="load-wrapper" *ngIf="loading">
                <span>Loading...</span>
            </div>
        </div>
    `,
    styles: [`
        .audio-item {
            position: relative;
            height: 135px;
            background: #D9DFE2;
            padding: 4px;
        }

        .audio-item__title {
            font-size: 12px;
        }

        .audio-item .user-placeholder {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 48px;
            display: none;
            align-items: flex-end;
        }

        .audio-item:hover .user-placeholder {
            display: flex;
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
            color: rgba(0, 0, 0, 0.6);
        }

        .audio-gallery {
            min-height: 100%;
            width: 100%;
            background-color: #ffffff;
            padding: 8px;
        }

        .audio-gallery__wrapper {
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

        mat-basic-audio-player {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
        }

        .audio-gallery .audio-item .ngx-basic-audio-player {
            min-width: 90px;
            box-shadow: none;
            background: #D9DFE2;
            border-radius: 0;
        }

        .audio-gallery .audio-item .ngx-basic-audio-player-button {
            padding: 0;
            min-width: 2px;
            opacity: 0.4;
        }

        .audio-gallery .disabled .audio-item:not(.playing) .ngx-basic-audio-player-button {
            pointer-events: none;
        }

        .audio-gallery .disabled .audio-item:not(.playing) .ngx-basic-audio-player {
            cursor: not-allowed;
        }

        .audio-gallery .audio-item .ngx-basic-audio-player-button:hover {
            opacity: 1;
        }

        .audio-gallery .audio-item .ngx-basic-audio-player .mat-slider-horizontal {
            min-width: 4px;
        }

        .audio-gallery .audio-item .ngx-basic-audio-player-duration {
            display: none !important;
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class AudioGalleryComponent implements OnInit, OnChanges {
    @Input() user: any;
    @Input() responses: any;
    public users = {};
    public audios: any[];
    public loading = false;
    @Output() public onLoad: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('audioEls') audioEls;

    constructor(public afStorage: AngularFireStorage) {
    }

    ngDoCheck(): void {
        if (this.audioEls && this.audioEls.nativeElement) {
            const children = this.audioEls.nativeElement.children;
            let result = false;
            for (let i = 0; i < children.length; i++) {
                if (!!children[i].querySelector('.pause-track')) {
                    children[i].classList.add('playing');
                    result = true;
                } else {
                    children[i].classList.remove('playing');
                }
            }

            if (result) {
                this.audioEls.nativeElement.classList.add('disabled');
            } else {
                this.audioEls.nativeElement.classList.remove('disabled');
            }
        }
    }

    async ngOnInit(): Promise<void> {
        await this.loadAudios();
    }

    async ngOnChanges(changes: SimpleChanges) {

        if (
            (changes.responses && this.hasChanged(changes.responses.previousValue, changes.responses.currentValue)) ||
            changes.user && ((changes.user.currentValue && !changes.user.previousValue) ||
            (changes.user.currentValue && changes.user.previousValue &&
                changes.user.currentValue.fullId !== changes.user.previousValue.fullId))
        ) {
            await this.loadAudios();
        }

    }

    public async loadAudios() {
        if (!this.responses || this.loading) {
            this.audios = [];
            this.users = {};
            return;
        }
        this.loading = true;
        this.onLoad.emit(true);
        this.audios = [];
        this.users = {};
        let i = 0;
        for (const response of this.responses) {
            const url = await this.afStorage.ref(response.responseValue).getDownloadURL().toPromise();
            this.audios.push({id: i++, url});
            this.users[url] = response.user;
        }

        this.loading = false;
        this.onLoad.emit(false);
    }

    private hasChanged(previousResponses: any[], currentResponses: any[]) {
        if (!previousResponses || !currentResponses) {
            return true;
        }

        if (previousResponses && previousResponses.length !== currentResponses.length) {
            return true;
        }

        return currentResponses.some(response => {
            return previousResponses.every(prev => prev.responseValue !== response.responseValue);
        });
    }
}
