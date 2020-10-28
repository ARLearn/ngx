import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../core/reducers";

@Component({
    selector: 'app-media-gallery-item',
    template: `
            <div class="item">
                <div
                        class="overlay"
                >
                    <app-filestore-background-image
                            *ngIf="!isVideo"
                            [paths]="[path]"
                            (isVideo)="$event?isVideo=true:isVideo=false"
                    ></app-filestore-background-image>
                    <app-filestore-background-video
                            *ngIf="isVideo"
                            [showControls]="false"
                            [paths]="[path]">
                    </app-filestore-background-video>
                </div>

                <div class="filename">
                    {{name | truncateString: 18 : '...'}}
                </div>
            </div>
    `,
    styles: [`
        .filename {
            text-align: left;
            font: Regular 11px/15px Roboto;
            letter-spacing: 0;
            color: #000000DE;
            opacity: 1;
            margin-top: 4px;
        }

        .white-icon {
            color: white;
        }
        
        .item {
            width: 152px;
            margin: 8px;
        }
        
        .overlay {
            width: 152px;
            height: 233px;
            position: relative;
        }
    `]
})
export class MediaGalleryItemComponent {
    @Input() name: string;
    @Input() path;

    isVideo = false;


    fileType() {
        return ".txt";
    }

}
