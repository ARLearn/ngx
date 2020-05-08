import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {
    getAbsolutePath,
    getFilesToUpload,
    getItems,
    getRelativePath,
    getUploadModus,
    relativePathWithTrailingSlash
} from "../../store/media-lib.selector";
import {Store} from "@ngrx/store";
import {State} from "../../../core/reducers";
import {FileToUpload} from "../../store/media-lib.state";

@Component({
    selector: 'app-media-lib-files-overview',
    template: `
        <div *ngIf="upload">
            <app-file-drop-zone
                    class="dropzone"
                    [isOpen]="(uploadModusActive$|async)"
            ></app-file-drop-zone>
            <app-file-to-upload
                    *ngFor="let fileToUpload of (filesToUpload$|async)"
                    [fileToUpload]="fileToUpload"></app-file-to-upload>
        </div>
        <div class="filesContainer">
            <app-app-file-tile
                    [multiSelect]="multiSelect"
                    [selected]="true"
                    [name]="item"
                    [folder]="(folder$ | async)"
                    (doubleClick)="doubleClick.emit()"
                    class="fileTile" *ngFor="let item of (items$|async)">{{item}}</app-app-file-tile>
        </div>
    `,
    styles: [`
        .filesContainer {
            top: 45px;
            left: 0px;
            right: 140px;
            position: relative;
            display: flex;
            flex-wrap: wrap;
            flex-flow: wrap;
            justify-content: flex-start;
            align-content: center;
            margin-left: -4px;

        }

        .fileTile {
            width: 152px;
            height: 233px;
            /*background-color: #9fd1ee;*/
            margin: 8px;
            position: relative;
        }

        .dropzone {
            width: 100%;
            height: 155px;
            background: #FFFFFF 0% 0% no-repeat padding-box;
            opacity: 1;
        }

        .uploadFileBox {
            width: 904px;
            height: 79px;
            display: block;
            text-align: center;
            background: #F8F8F8 0% 0% no-repeat padding-box;
            position: relative;
        }

    `]
})
export class MediaLibFilesOverviewComponent implements OnInit {
    @Input() multiSelect: false;
    @Input() upload = true;
    @Output() doubleClick = new EventEmitter();

    public items$: Observable<string[]> = this.store.select(getItems);
    public folder$: Observable<string> = this.store.select(relativePathWithTrailingSlash);
    public uploadModusActive$: Observable<boolean> = this.store.select(getUploadModus);
    public filesToUpload$: Observable<FileToUpload[]> = this.store.select(getFilesToUpload);

    constructor(
        public store: Store<State>
    ) {
    }

    ngOnInit() {
    }

}
