import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';
import {AngularFireStorage} from "angularfire2/storage";
import {take} from "rxjs/operators";

@Component({
    selector: 'app-filestore-background-image',
    template: `
        <div class="background-pane"
             [ngStyle]="{'background-image': 'url(&quot;' +  url + '?alt=media&quot;)'}"
        >
            <div *ngIf="deleteButton" class="deleteSplashScreen" (click)="deleteClickedEvent($event)">
                <mat-icon class="deleteIcon" matPrefix>delete</mat-icon>
            </div>

            <div *ngIf="editButton" class="deleteSplashScreen" (click)="editClickedEvent($event)">
                <mat-icon class="deleteIcon" matPrefix>create</mat-icon>
            </div>

                        <ng-content></ng-content>
        </div>
    `,
    styles: [`
        .background-pane {
            position: absolute;
            background-position: center center;
            background-repeat: no-repeat;
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;
            top: 0px;
            bottom: 0px;
            left: 0px;
            right: 0px;
            height: 100%;
        }

        .deleteSplashScreen {
            z-index: 10;
            cursor: pointer;
            position: absolute;
            top: 15px;
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
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

        }

    `]
})
export class FilestoreBackgroundImageComponent implements OnInit, OnChanges {

    @Input() paths: string[];
    @Input() deleteButton = false;
    @Input() editButton = false;
    @Output() delete = new EventEmitter<boolean>();
    @Output() edit = new EventEmitter<boolean>();
    @Output() isVideo = new EventEmitter<boolean>();
    @Output() loadSuccess = new EventEmitter<boolean>();
    @Output() loadFailure = new EventEmitter<boolean>();

    url;

    // encodeURI(url) {
    //     return  encodeURI(url);
    // }

    getBackgroundurl(i) {
        console.log(i + ' url(' + this.url + '?alt=media)');
        return 'url(' + this.url + '?alt=media)';
    }

    constructor(
        public afStorage: AngularFireStorage) {
    }

    ngOnInit() {
        this.load(this.paths);
    }

    load(paths: string[]) {
        if (paths.length !== 0) {

            this.afStorage.ref(paths[0]).getMetadata()
                .pipe(take(1))
                .subscribe(md => {
                    if (md.contentType.indexOf("video/") !== -1) {
                        this.isVideo.emit(true);
                    }

                });
            this.afStorage.ref(paths[0]).getDownloadURL()
                // .pipe(take(1))
                .subscribe((avatarUrl) => {

                    this.url = avatarUrl;//.replace(" ", "%20");
                    this.loadSuccess.emit();

                }, (error) => {
                    this.loadFailure.emit();
                    this.load(paths.splice(1));
                });
        }

    }

    deleteClickedEvent(event) {
        event.stopPropagation();
        this.delete.emit(true);
    }

    editClickedEvent(event) {
        event.stopPropagation();
        this.edit.emit(true);
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.load(this.paths);
    }
}
