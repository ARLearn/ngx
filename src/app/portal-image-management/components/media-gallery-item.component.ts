import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../core/reducers";

@Component({
    selector: 'app-media-gallery-item',
    template: `
            <div class="item" [class.selected]="selected" (click)="onClick.emit()">
                <div
                        class="overlay"
                >
                    <div class="icon" *ngIf="selected">
                        <mat-icon class="check-icon white-icon">check</mat-icon>
                    </div>
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
            text-align: center;
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
            width: 156px;
            margin: 8px;
            cursor: pointer;
            border: 2px solid transparent;
        }
        
        .overlay {
            width: 152px;
            height: 233px;
            position: relative;
        }
        
        .icon {
            position: absolute;
            top: 0;
            right: 0;
            background: #3EA3DC;
            z-index: 101;
            height: 24px;
            border-bottom-left-radius: 4px;
        }
        
        .item.selected {
            border: 2px solid #3EA3DC;
        }
    `]
})
export class MediaGalleryItemComponent {
    @Input() name: string;
    @Input() path;
    @Input() selected: boolean;

    @Output() onClick = new EventEmitter();

    isVideo = false;


    fileType() {
        return ".txt";
    }

}
