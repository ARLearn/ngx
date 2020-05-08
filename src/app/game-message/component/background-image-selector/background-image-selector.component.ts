import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {GameMessage} from "../../../game-messages/store/game-messages.state";
import {getEditMessageSelector} from "../../store/game-message.selector";
import {GameMessageUpdateAction, GameMessageUpdateFileReferenceAction} from "../../store/game-message.actions";
import {Store} from "@ngrx/store";
import {State} from "../../../core/reducers";

@Component({
    selector: 'app-background-image-selector',
    template: `
        <app-filestore-background-image *ngIf="!((!(message$|async)?.fileReferences) || (!((message$|async)?.fileReferences[key]))) "
                                        [paths]="[((message$|async)?.fileReferences[key])]"
                                        [deleteButton]="true"
                                        (delete)="deleteAsset()"
        >
            <ng-content></ng-content>
        </app-filestore-background-image>
        <app-asset-selector
                *ngIf="(!(message$|async)?.fileReferences) || (!((message$|async)?.fileReferences[key]))"
                icon="image"
                [title]="'Kies achtergrond'"
                [subtitle]="'jouw startscherm & assets, of'"
                (assetSelect)="attachSplash($event)"
        >
        </app-asset-selector>
    `,
    styleUrls: ['./background-image-selector.component.css']
})
export class BackgroundImageSelectorComponent implements OnInit {

    @Input() key = 'background';

    message$: Observable<GameMessage> = this.store.select(getEditMessageSelector);

    constructor(public store: Store<State>) {
    }

    ngOnInit() {
    }

    attachSplash(event) {
        console.log("selected message background is", event)
        const objectRef = {};
        objectRef[this.key] = event;
        this.store.dispatch(new GameMessageUpdateFileReferenceAction({
            delete: false,
            key: this.key,
            value: event
            // fileReferences: objectRef
        }));
    }

    deleteAsset() {
        this.store.dispatch(new GameMessageUpdateFileReferenceAction({
            delete: true,
            key: this.key
        }));
    }

}
