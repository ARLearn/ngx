import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {GameMessage} from "../../../../game-messages/store/game-messages.state";
import {getEditMessageSelector} from "../../../store/game-message.selector";
import {Store} from "@ngrx/store";
import {State} from "../../../../core/reducers";
import {GameMessageUpdateAction} from "../../../store/game-message.actions";

@Component({
    selector: 'app-mobile-preview-video',
    template: `
        <app-filestore-background-video
                *ngIf="!(!(message$|async)?.fileReferences || !((message$|async)?.fileReferences['video']))"
                [paths]="[((message$|async)?.fileReferences['video'])]"
                [deleteButton]="true"
                (delete)="deleteAsset($event)"
        >
            <app-preview-navbar></app-preview-navbar>
        </app-filestore-background-video>
        <app-asset-selector
                *ngIf="!(message$|async)?.fileReferences || !((message$|async)?.fileReferences['video'])"
                icon="cloud"
                [title]="'Kies video'"
                [subtitle]="'jouw startscherm & assets, of'"
                (assetSelect)="attachSplash($event)"
        >
        </app-asset-selector>
    `,
    styleUrls: ['./mobile-preview-video.component.css']
})
export class MobilePreviewVideoComponent implements OnInit {

    message$: Observable<GameMessage> = this.store.select(getEditMessageSelector);

    constructor(private store: Store<State>) {
    }

    ngOnInit() {
    }

    attachSplash(event) {
        const objectRef = {};
        objectRef['video'] = event;
        this.store.dispatch(new GameMessageUpdateAction({
            fileReferences: objectRef
        }));
    }

    deleteAsset(event) {
        this.store.dispatch(new GameMessageUpdateAction({
            fileReferences: {}
        }));
    }
}
