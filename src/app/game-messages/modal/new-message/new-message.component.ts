import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {environment} from '../../../../environments/environment';
import {Store} from '@ngrx/store';
import {State} from '../../../core/reducers';
import {NewMessageRequestedAction} from '../../store/game-messages.actions';

@Component({
    selector: 'app-new-message',
    template: `
        <div [ngSwitch]="screen">
            <app-new-message-entry-screen
                    *ngSwitchCase="1"
                    (esc)="onNoClick()"
                    (clickEvent)="messageTypeSelect($event)">
            </app-new-message-entry-screen>
            <app-new-message-create
                    *ngSwitchCase="2"
                    [messageType]="messageType"
                    (esc)="onNoClick()"
                    (back)="screen = 1">
            </app-new-message-create>
        </div>
    `,
    styles: [``]
})
export class NewMessageComponent implements OnInit {
    screen = 1;
    messageType: string;
    messageTypes: string[];

    constructor(public dialogRef: MatDialogRef<NewMessageComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                public store: Store<State>) {
    }

    ngOnInit() {
        this.messageTypes = environment.messageType;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    messageTypeSelect(type: string) {
        this.messageType = type;
        this.screen = 2;
    }

}
