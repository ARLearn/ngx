import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../core/reducers';
import {environment} from '../../../../environments/environment';
import {MatOptionSelectionChange} from '@angular/material/core';
import {MatSelectChange} from '@angular/material/select';
import {Observable} from 'rxjs';
import {GameMessage} from '../../../game-messages/store/game-messages.state';
import {getCurrentMessageSelector} from '../../../game-messages/store/game-messages.selector';
import {getEditMessageSelector} from '../../store/game-message.selector';
import {GameMessageUpdateAction} from '../../store/game-message.actions';
import { iCanWrite } from 'src/app/game-management/store/current-game.selector';

@Component({
    selector: 'app-screen-editor-type-select',
    template: `
        <div>
            <mat-form-field class="mat-form-messages">
                <mat-select 
                        [disabled]="!(iCanWrite|async)"
                        appTriggerMobileView [data]="{}" [name]="'mc'" placeholder="Type" [value]="(message$ |async)?.type"
                            (selectionChange)="selectionChange($event)">
                    <mat-option
                            *ngFor="let messageType of messageTypes"
                            [value]="'org.celstec.arlearn2.beans.generalItem.'+messageType">
                        {{ 'MESSAGE.' + messageType.toLocaleUpperCase() | translate }}
                    </mat-option>
                </mat-select>
            </mat-form-field>
        </div>
    `,
    styles: [`
      
    `]
})
export class ScreenEditorTypeSelectComponent implements OnInit {

    message$: Observable<GameMessage> = this.store.select(getEditMessageSelector);
    @Output('onTypeChange') onTypeChange: EventEmitter<string> = new EventEmitter<string>();
    messageTypes: string[];
    public iCanWrite: Observable<boolean> = this.store.pipe(select(iCanWrite));
    value: string;

    constructor(
        private store: Store<State>
    ) {
        this.messageTypes = environment.messageType;
    }

    ngOnInit() {
    }

    selectionChange(event: any) {
        // console.log(event.source.value, event, event.value, 'changed');
        this.store.dispatch(new GameMessageUpdateAction({type: event.value}));
        this.onTypeChange.emit(event.value);
    }

}
