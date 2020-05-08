import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {GameMessage} from "../../../../game-messages/store/game-messages.state";
import {getEditMessageSelector, selectedColor} from "../../../store/game-message.selector";
import {Store} from "@ngrx/store";
import {State} from "../../../../core/reducers";
import {GameMessageUpdateFileReferenceAction} from "../../../store/game-message.actions";

@Component({
    selector: 'app-mobile-preview-multiple-choice-image',
    template: `
            <app-background-image-selector>
                <app-preview-navbar></app-preview-navbar>
                <div class="full-with-height-container">
                    <div class="text-box-preview">
                        <div
                                [ngStyle]="{'color': (selectedColor$ |async) }"
                                class="screen-preview-card-title font-bold-20px-24px-gentium-basic "
                        > {{(message$|async)?.name}}
                        </div>
                        <mat-grid-list class="pos-grid-list" cols="2" rowHeight="4:4">
                            <mat-grid-tile
                                    [colspan]="(((i==0) && (((message$|async)?.answers.length %2) === 1 )) || ((message$|async)?.answers.length == 2))?2:1"
                                    *ngFor="let answer of (message$|async)?.answers; let i = index">
                                <app-filestore-background-image
                                        *ngIf="!((!(message$|async)?.fileReferences) || (!((message$|async)?.fileReferences[answer.id]))) "
                                        [paths]="[((message$|async)?.fileReferences[answer.id])]"
                                        [deleteButton]="true"
                                        (delete)="deleteAsset(answer.id)"

                                >
                                    <ng-content></ng-content>
                                </app-filestore-background-image>
                            </mat-grid-tile>
                        </mat-grid-list>
                        <button
                                class="gl-pos-button-right pos-button"
                                [ngStyle]="{'background-color': (selectedColor$ |async) }"
                                mat-raised-button>Verder</button>
                    </div>

                </div>
            </app-background-image-selector>
        
    `,
    styles: [`
        .pos-grid-list {
            margin: 0px 24px 0px 24px;
        }
        .pos-button {
            right: 5px;
            bottom: -10px;
            color: white;
        }
    `]
})
export class MobilePreviewMultipleChoiceImageComponent implements OnInit {

    message$: Observable<GameMessage> = this.store.select(getEditMessageSelector);
    selectedColor$: Observable<string> = this.store.select(selectedColor);

    constructor(public store: Store<State>) {
    }

    ngOnInit() {
    }

    deleteAsset(key) {
        this.store.dispatch(new GameMessageUpdateFileReferenceAction({
            delete: true,
            key: key
        }));
    }

}
