import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {GameMessage} from "../../../game-messages/store/game-messages.state";
import {getEditMessageSelector} from "../../../game-message/store/game-message.selector";
import {select, Store} from "@ngrx/store";
import {State} from "../../../core/reducers";
import {GameMessageSaveAction} from "../../store/game-message.actions";
import {iCanWrite} from 'src/app/game-management/store/current-game.selector';

@Component({
    selector: 'app-screen-editor',
    template: `

        <div class="editor-container">
            <app-screen-editor-type-select
                    class="gl-pos-between-fields"
                    (onTypeChange)="onTypeChange($event)"></app-screen-editor-type-select>
            <div [ngSwitch]="(message$|async)?.type" class="pos-message">
                <app-screen-editor-type-narrator
                        *ngSwitchCase="'org.celstec.arlearn2.beans.generalItem.NarratorItem'">
                </app-screen-editor-type-narrator>
                <app-screen-editor-type-narrator
                        *ngSwitchCase="'org.celstec.arlearn2.beans.generalItem.PictureQuestion'">
                </app-screen-editor-type-narrator>
                <app-screen-editor-type-narrator
                        *ngSwitchCase="'org.celstec.arlearn2.beans.generalItem.AudioQuestion'">
                </app-screen-editor-type-narrator>
                <app-screen-editor-type-narrator
                        *ngSwitchCase="'org.celstec.arlearn2.beans.generalItem.TextQuestion'">
                </app-screen-editor-type-narrator>
                <app-screen-editor-type-narrator
                        *ngSwitchCase="'org.celstec.arlearn2.beans.generalItem.VideoQuestion'">
                </app-screen-editor-type-narrator>
                <app-screen-editor-type-single-choice-test
                        *ngSwitchCase="'org.celstec.arlearn2.beans.generalItem.SingleChoiceTest'">
                </app-screen-editor-type-single-choice-test>
                <app-screen-editor-type-multiple-choice-test
                        *ngSwitchCase="'org.celstec.arlearn2.beans.generalItem.MultipleChoiceTest'">
                </app-screen-editor-type-multiple-choice-test>
                <app-screen-editor-type-video-object
                        *ngSwitchCase="'org.celstec.arlearn2.beans.generalItem.VideoObject'">
                </app-screen-editor-type-video-object>
                <app-screen-editor-type-audio-object
                        *ngSwitchCase="'org.celstec.arlearn2.beans.generalItem.AudioObject'">
                </app-screen-editor-type-audio-object>
                <app-screen-editor-type-scan-tag
                        *ngSwitchCase="'org.celstec.arlearn2.beans.generalItem.ScanTag'">
                </app-screen-editor-type-scan-tag>
                <app-screen-editor-type-single-choice-image
                        *ngSwitchCase="'org.celstec.arlearn2.beans.generalItem.SingleChoiceImageTest'">
                </app-screen-editor-type-single-choice-image>
                <app-screen-editor-type-multiple-choice-image
                        *ngSwitchCase="'org.celstec.arlearn2.beans.generalItem.MultipleChoiceImageTest'">
                </app-screen-editor-type-multiple-choice-image>
            </div>

            <button mat-stroked-button
                    *ngIf="iCanWrite|async"
                    class="gl-pos-button-right pos-button gl-style-stroke-button gl-style-large-button"
                    color="primary" (click)="save()">{{'ACTIONS.SAVE' |translate}}</button>
            <div class="pos-spacer"></div>

        </div>
    `,
    styles: [`
        .editor-container {
            position: relative;
            margin-top: 100px;
            width: 403px;
            margin-left: auto;
            margin-right: auto;
        }

        /*.save-button {*/
        /*    !*position: relative;*!*/
        /*    !*right: 0px;*!*/
        /*    margin-bottom: 300px;*/
        /*}*/

        .pos-message {
            position: relative;
        }

        .pos-spacer {
            position: relative;
            height: 300px;
        }

        .pos-button {
            width: 131px;
            text-transform: uppercase;
        }
    `]
})
export class ScreenEditorComponent implements OnInit {

    message$: Observable<GameMessage> = this.store.select(getEditMessageSelector);
    public iCanWrite: Observable<boolean> = this.store.pipe(select(iCanWrite));

    // selectedType: string;

    constructor(private store: Store<State>) {
    }

    ngOnInit() {
    }

    onTypeChange(event: string) {

        //this.selectedType = event;
    }

    save() {
        this.store.dispatch(new GameMessageSaveAction());

    }
}
