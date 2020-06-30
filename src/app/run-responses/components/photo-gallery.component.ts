import {Component, Input, OnInit} from '@angular/core';
import {AngularFireStorage} from "angularfire2/storage";

@Component({
    selector: 'app-photo-gallery',
    template: `
    <div class="photo-gallery">
        <div class="masonry">
            <div class="masonry-brick" [ngClass]="{'masonry-brick--thin': options[img] === 'thin', 'masonry-brick--wide': options[img] === 'wide'}" *ngFor="let img of images">
                <img [src]="img"  alt=""/>
            </div>
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

        .masonry-brick img {
            height: 100%;
            width: 100%;
            object-fit: fill;
        }
        .photo-gallery {
            width: 100%;
            padding: 4px;
            background-color: #ffffff;
            height: 100%;
        }
    `]
})
export class PhotoGalleryComponent implements OnInit {
    public options = {};
    @Input() responses: any = [];
    images = [];

    constructor(public afStorage: AngularFireStorage) {}

    async ngOnInit(): Promise<void> {
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
    }

    public async getImageParam(url) {
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

}
