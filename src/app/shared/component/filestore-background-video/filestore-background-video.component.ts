import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../../core/reducers";
import {AngularFireStorage} from "angularfire2/storage";

@Component({
    selector: 'app-filestore-background-video',
    template: `
        <div class="background-pane">
            <video class="full-width-height-container" controls [attr.src]="url" *ngIf="showControls">
            </video>
            <video class="full-width-height-container" [attr.src]="url+'#t=1.0'" *ngIf="!showControls">
            </video>
            <div *ngIf="deleteButton" class="deleteSplashScreen" (click)="deleteClickedEvent($event)">
                <mat-icon class="deleteIcon" matPrefix>delete</mat-icon>
            </div>
            <ng-content></ng-content>
        </div>
    `,
    styles: [`
        video.full-width-height-container {
            object-fit: cover;
            position: absolute;
            height: 100%;
            width: 100%;
        }
        
        .background-pane {
            background-size:cover;
            position: absolute;
            top:0px;
            bottom: 0px;
            left:0px;
            right:0px;
            height: 100%;
        }

        .deleteSplashScreen {
            z-index: 10;
            cursor: pointer;
            position: absolute;
            top: 59px;
            right: 15px;
            width: 48px;
            height: 48px;
            background: #FAFAFA 0% 0% no-repeat padding-box;
            border: 1px solid #FFFFFF;
            border-radius: 2px;
            opacity: 1;
        }
        .deleteIcon {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%,-50%);

        }

    `]
})
export class FilestoreBackgroundVideoComponent implements OnInit {

    @Input() paths: string[];
    @Input() deleteButton = false;
    @Input() showControls = true;
    @Output() delete = new EventEmitter<boolean>();

    url;

    constructor(private store: Store<State>, public afStorage: AngularFireStorage) {

    }

    ngOnInit() {
        this.load(this.paths);
    }

    load(paths: string[]) {
        if (paths.length !== 0) {
            this.afStorage.ref(paths[0]).getDownloadURL()
                // .take(1)
                .subscribe((avatarUrl) => {
                    this.url = avatarUrl;
                }, (error) => {
                    this.load(paths.splice(1));
                });
        }

    }

    deleteClickedEvent(event) {
        event.stopPropagation();
        this.delete.emit(true);
    }
}
