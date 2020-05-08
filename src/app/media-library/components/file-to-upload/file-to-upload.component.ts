import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {FileToUpload} from "../../store/media-lib.state";
import {Store} from "@ngrx/store";
import {State} from "../../../core/reducers";
import {StartUploadAction} from "../../store/media-lib.actions";

@Component({
    selector: 'app-file-to-upload',
    template: `
        <div class="thumb-area">
            <div class="progress" *ngIf="fileToUpload.uploading">
                <mat-progress-bar mode="determinate" [value]="fileToUpload.progress"></mat-progress-bar>
            </div>
        </div>
        <div class="file-name">
            {{fileToUpload?.file.name}}
        </div>

        <div class="cancel-button">
            <button mat-button>
                Cancel upload
                <mat-icon>cancel</mat-icon>
            </button>
        </div>
    `,
    styles: [`
        .thumb-area {
            position: absolute;
            left: 16px;
            top: 18px;
            width: 43px;
            height: 43px;
            background: #FFFFFF 0% 0% no-repeat padding-box;
            border: 1px solid #DDDDDD;
            border-radius: 2px;
            opacity: 1;
        }

        .progress {
            position: absolute;
            top: 32px;
            left: 5px;
            width: 33px;
            height: 6px;
        }

        .file-name {
            position: absolute;
            left: 78px;
            top: 30px;
            text-align: left;
            font: Regular 14px/19px Roboto;
            letter-spacing: 0;
            color: #000000DE;
            opacity: 0.5;
        }

        .cancel-button {
            position: absolute;
            right: 64px;
            top: 21px;
        }
    `]

})
export class FileToUploadComponent implements OnInit {
    @HostBinding('attr.class') cssClass = 'uploadFileBox';

    @Input() fileToUpload: FileToUpload;

    constructor(public store: Store<State>) {
    }

    ngOnInit() {
      this.store.dispatch(new StartUploadAction());
    }

}
