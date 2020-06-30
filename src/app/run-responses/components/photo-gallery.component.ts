import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {AngularFireStorage} from "angularfire2/storage";

@Component({
    selector: 'app-photo-gallery',
    template: `
    <div class="photo-gallery">
        <div *ngIf="!loading" class="masonry">
            <div class="masonry-brick" [ngClass]="{'masonry-brick--thin': options[img] === 'thin', 'masonry-brick--wide': options[img] === 'wide', 'masonry-brick--first': i == 0}" *ngFor="let img of images; let i = index">
                <img [src]="img"  alt="" />

                <div *ngIf="i == 0" class="user-placeholder">
                    <div class="user">
                        <div class="user__avatar">{{ user.avatar }}</div>
                        <div class="user__name">{{ user.name }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="load-wrapper" *ngIf="loading">
            <span>Loading...</span>
        </div>
        <div class="load-wrapper" *ngIf="!loading && images.length === 0">
            <span>There is no data</span>
        </div>
    </div>
    `,
    styles: [`
        .masonry {

        }

        .masonry-brick {
            float: left;
            height: 160px;
            margin: 4px;
        }

        .masonry-brick--wide {
            width: 167px;
        }

        .masonry-brick--thin {
            width: 95px;
        }

        .masonry-brick--first {
            position: relative;
        }

        .masonry-brick--first .user-placeholder {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: flex-end;
            background: linear-gradient(0deg, rgba(29,29,29,1) 0%, rgba(255,255,255,0) 100%);
        }

        .masonry-brick img {
            height: 100%;
            width: 100%;
            object-fit: fill;
        }

        .user {
            display: flex;
            align-items: center;
            padding: 10px;
        }

        .user__avatar {
            height: 23px;
            width: 23px;
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
        }

        .photo-gallery {
            width: 100%;
            padding: 4px;
            background-color: #ffffff;
            height: 100%;
        }

        .load-wrapper {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    `]
})
export class PhotoGalleryComponent implements OnInit, OnChanges {
    public options = {};
    @Input() user: any = {};
    @Input() responses: any = [];
    public images = [];
    public loading = false;

    constructor(public afStorage: AngularFireStorage) {}

    async ngOnInit(): Promise<void> {
        await this.loadPhotos();
    }

    async ngOnChanges(changes: SimpleChanges) {
        if (changes.user && changes.user.currentValue && changes.user.previousValue &&
            changes.user.currentValue.fullId !== changes.user.previousValue.fullId
        ) {
            await this.loadPhotos();
        }
    }


    public async loadPhotos() {
        this.loading = true;
        this.images = [];
        for (const respValue of this.responses) {
            this.images.push(await this.afStorage.ref(respValue).getDownloadURL().toPromise());
        }

        this.images.forEach(image => this.options[image] = 'thin');

        for (const img of this.images) {
            const dimensions = await this.getImageParam(img) as { width: number, height: number };

            if (dimensions.width > dimensions.height) {
                this.options[img] = 'wide';
            }
        }
        
        this.images = this.shuffleImages();
        this.loading = false;
    }

    public getImageParam(url) {
        return new Promise((resolve) => {
            const img = document.createElement('img');
            img.src = url;
            img.onload = () => {
                const width = img.width;
                const height = img.height;

                resolve({ width, height });
            };
        });
    }

    public shuffleImages() {
        const len = this.images.length;

        const thinEls = Object.entries(this.options).filter(([, type]) => type === 'thin').map(([url]) => url);
        const wideEls = Object.entries(this.options).filter(([, type]) => type === 'wide').map(([url]) => url);

        const lenThin = thinEls.length;
        const lenWide = wideEls.length;

        const MAX_IMGS_IN_ROW = 5;
        const MAX_WIDE_IMGS_IN_ROW = 2;

        let wideIndex = 0;
        let thinIndex = 0;

        let wideCounter = 0;

        const result = [];

        for (let row = 0; row < Math.ceil(len / MAX_IMGS_IN_ROW); row++) {
            let chunk = [];

            for (let i = 0; i < MAX_IMGS_IN_ROW; i++) {
                if (wideIndex < lenWide && wideCounter < MAX_WIDE_IMGS_IN_ROW) {
                    chunk.push(wideEls[wideIndex++]);
                    wideCounter++;
                    continue;
                }

                if (thinIndex < lenThin) {
                    chunk.push(thinEls[thinIndex++]);
                }
            }
            if (row === 0) {
                result.push(...[chunk[0], ...this.shuffle(chunk.slice(1))]);
            } else {
                result.push(...this.shuffle(chunk));
            }


            wideCounter = 0;
        }

        return result;
    }

    private shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

}
