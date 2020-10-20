import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../../core/reducers";
import {SetFilesToUploadAction, SetUploadModusAction} from "../../store/media-lib.actions";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
    selector: 'app-file-uploader',
    template: `
        <div class="drop open-close-container" [@openClose]="isOpen ? 'open' : 'closed'" [class.drop--small]="small"
             appDragDrop (fileDropped)="uploadFile($event)"
             (click)="fileInput.click()">
            <input hidden type="file" #fileInput (change)="uploadFile($event.target.files)">
            
            <div>
                <mat-icon class="icon">insert_photo</mat-icon>
            </div>
            
            <h5 class="title" *ngIf="!small">{{ title }}</h5>
            
            <p class="desc" *ngIf="!small">{{ 'MEDIA.FILE_DROPZONE_DESCRIPTION' | translate }}</p>
            <p class="desc" *ngIf="!small">{{ 'OR' | translate }}</p>
            <button mat-raised-button color="primary" *ngIf="!small">{{ 'BTN.BROWSE' | translate }}</button>
        </div>
    `,
    styleUrls: ['./file-uploader.component.css'],
    animations: [
        trigger('openClose', [
            // ...
            state('open', style({
                height: '200px',
                opacity: 1,

            })),
            state('closed', style({
                height: '0px',
                opacity: 0,
            })),
            transition('open => closed', [
                animate('0.3s ease-in-out')
            ]),
            transition('closed => open', [
                animate('0.3s ease-in-out')
            ]),
        ]),
    ],
})
export class FileUploaderComponent implements OnInit {

    @Input() isOpen;
    @Input() customPath: string;
    @Input() title: string;
    @Input() small: boolean = false;

    @Output() fileDropped = new EventEmitter();


    constructor(public store: Store<State>) {
    }

    ngOnInit() {
    }

    uploadFile(event: FileList) {
        console.log(event.length);
        console.log(event.item(0).name);
        if (this.customPath) {
            this.store.dispatch(new SetFilesToUploadAction({
                customPath: this.customPath,
                files: event
            }));
        } else {
            this.store.dispatch(new SetFilesToUploadAction({
                files: event
            }));
        }

        this.fileDropped.emit();
    }

    close(event) {
        event.stopPropagation();
        this.store.dispatch(new SetUploadModusAction({modus: false}));

    }
}
