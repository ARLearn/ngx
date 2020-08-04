import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../../core/reducers";
import {SetFilesToUploadAction, SetUploadModusAction} from "../../store/media-lib.actions";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
    selector: 'app-file-drop-zone',
    template: `
        <div class="drop open-close-container" [@openClose]="isOpen ? 'open' : 'closed'"
             appDragDrop (fileDropped)="uploadFile($event)"
             (click)="fileInput.click()">
            <input hidden type="file" #fileInput (change)="uploadFile($event.target.files)">
            <div class="drag-files">{{'MEDIA.DRAG_FILES' |translate}}</div>
            <div class="click-files">{{'MEDIA.OR_CLICK_FILES' |translate}} </div>
            <div class="close-drop">
                <button mat-icon-button (click)="close($event)">
                    <mat-icon>close</mat-icon>
                </button>
            </div>
        </div>
    `,
    styleUrls: ['./file-drop-zone.component.css'],
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
export class FileDropZoneComponent implements OnInit {

    @Input() isOpen;
    @Input() customPath: string;
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
