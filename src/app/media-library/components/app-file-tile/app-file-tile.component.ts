import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../../core/reducers";
import {Observable} from "rxjs";
import {Game} from "../../../game-management/store/current-game.state";
import {getGame} from "../../../game-management/store/current-game.selector";
import {SelectFileAction} from "../../store/media-lib.actions";
import {getSelectedFiles} from "../../store/media-lib.selector";

@Component({
    selector: 'app-app-file-tile',
    template: `

        <div
                class="overlay"
                (click)="selectFile()"
                (dblclick)="doubleClickMethod()"
        >
            <app-filestore-background-image
                    *ngIf="!isVideo"
                    [paths]="['/game/'+(game$|async)?.gameId+folder+'/'+name]"
                    (isVideo)="$event?isVideo=true:isVideo=false"
            ></app-filestore-background-image>
            <app-filestore-background-video
                    *ngIf="isVideo"
                    [showControls]="false"
                    [paths]="['/game/'+(game$|async)?.gameId+folder+'/'+name]">
            </app-filestore-background-video>
        </div>

        <div class="filename">
            {{name | truncateString: 18 : '...'}}
        </div>

        <div class="overlay-check" *ngIf="(selectedFileNames$|async).indexOf(folder+name) > -1">
            <mat-icon class="white-icon">check</mat-icon>
        </div>
        <div class="overlay-transparent"
             (click)="selectFile()"
             (dblclick)="doubleClickMethod()"
             *ngIf="(selectedFileNames$|async).indexOf(folder+name) > -1"></div>
    `,
    styles: [`
        .overlay {
            top: 0px;
            left: 0px;
            width: 152px;
            height: 206px;
            position: absolute;

        }

        .overlay-transparent {
            position: absolute;
            z-index: 2;
            width: 148px;
            height: 240px;

            border: 2px solid #3EA3DC;
            opacity: 1;

        }

        .overlay-check {
            position: absolute;
            z-index: 2;
            top: 0px;
            right: 0px;
            width: 24px;
            height: 24px;
            background: #3EA3DC 0% 0% no-repeat padding-box;
            border-radius: 0px 0px 0px 3px;
            opacity: 1;
        }

        .filename {
            position: absolute;
            top: 214px;
            left: 14px;
            text-align: left;
            font: Regular 11px/15px Roboto;
            letter-spacing: 0;
            color: #000000DE;
            opacity: 1;
        }

        .white-icon {
            color: white;
        }

    `]
})
export class AppFileTileComponent implements OnInit {
    @Input() multiSelect: false;
    @Input() name: string;
    @Input() selected: boolean;
    @Input() folder = '/';
    @Output() doubleClick = new EventEmitter();

    isVideo = false;

    public game$: Observable<Game> = this.store.select(getGame);
    public selectedFileNames$: Observable<string[]> = this.store.select(getSelectedFiles);

    constructor(
        private store: Store<State>
    ) {
    }

    ngOnInit() {
    }

    selectFile() {
        this.store.dispatch(new SelectFileAction({
            file: this.folder + this.name,
            multiSelect: this.multiSelect
        }));
    }


    doubleClickMethod() {
        console.log("dbl click");
        this.store.dispatch(new SelectFileAction({
            file: this.folder + this.name,
            multiSelect: this.multiSelect
        }));
        if (!this.multiSelect) {
            this.doubleClick.emit();
        }

    }

    fileType() {
        return ".txt";
    }

}
