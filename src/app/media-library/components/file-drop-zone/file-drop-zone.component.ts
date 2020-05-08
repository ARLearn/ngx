import {Component, Input, OnInit} from '@angular/core';
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
            <div class="drag-files">Sleep je bestanden</div>
            <div class="click-files">of klik om je bestanden te uploaden </div>
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


    constructor(public store: Store<State>) {
    }

    ngOnInit() {
    }

    uploadFile(event: FileList) {
        console.log(event.length);
        console.log(event.item(0).name);
        this.store.dispatch(new SetFilesToUploadAction({files: event}));
    }

    close(event) {
        event.stopPropagation();
        this.store.dispatch(new SetUploadModusAction({modus: false}));

    }
}
