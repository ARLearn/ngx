import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../../core/reducers";
import {SetAbsolutePathAction} from "../../store/media-lib.actions";

@Component({
    selector: 'app-media-lib-container',
    template: `
        <div class="parent" *ngIf="!!gameId">
            <div class="folders">
                <app-media-lib-folders></app-media-lib-folders>
            </div>
            <div class="line">
            </div>
            <div class="files">
                <app-media-lib-files-overview
                        [upload]="upload"
                        [multiSelect]="multiSelect"
                        (doubleClick)="doubleClick.emit()"
                ></app-media-lib-files-overview>
            </div>
        </div>
    `,
    styleUrls: ['./media-lib-container.component.css']
})
export class MediaLibContainerComponent implements OnInit, OnChanges {

    @Input() gameId: number;
    @Input() multiSelect: false;
    @Input() upload = true;
    @Output() doubleClick = new EventEmitter();

    constructor(
        private store: Store<State>
    ) {
    }

    ngOnInit() {

    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.gameId) {
            console.log("todo dispatch ", this.gameId);
            this.store.dispatch(new SetAbsolutePathAction({gameId: this.gameId}));
        }
    }

}
