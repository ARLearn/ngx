import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {iAmOwner} from "../../../store/current-game.selector";

import {Player} from "../../../../player-management/store/player.state";
import {AddGameAuthorRequestAction, RemoveGameAuthorRequestAction} from "../../../store/current-game.actions";
import {select, Store} from "@ngrx/store";
import {State} from "../../../../core/reducers";
import {Observable} from "rxjs";

@Component({
    selector: 'app-game-detail-collaborator-entry',
    template: `
        <div class="entry">
            <div class="picture">
                <mat-icon class="delete-icon">account_circle</mat-icon>
            </div>
            <div class="colab-data">
                <div class="colab-data-name">{{author.name}} </div>
                <div class="colab-data-email">{{author.email}}</div>
            </div>
            <div class="pos-end-of-line">
                <mat-form-field class="gl-editor">
                    <mat-select
                            [disabled]="!(iAmOwner|async)"
                            [value]="author.accessRights+''"
                            (selectionChange)="selectionChange($event)">
                        <mat-option value="1">{{'CONTACT.OWNER'|translate}}</mat-option>
                        <mat-option value="2">{{'CONTACT.EDITOR'|translate}}</mat-option>
                        <mat-option value="3">{{'CONTACT.VIEWER'|translate}}</mat-option>
                    </mat-select>
                </mat-form-field>
                <div class="pos-remove"
                     *ngIf="iAmOwner|async"
                     (click)="isAbleToDelete && delete()">
                    <div class="delete-icon">
                        <mat-icon>delete</mat-icon>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .entry {
            position: relative;
            height: 38px;
            margin-top: 12px;
        }

        .picture {
            position: absolute;
            width: 32px;
            height: 32px;
            top: 4px;
            left: 0px;
        }

        .colab-data {
            position: absolute;
            height: 100%;
            left: 49px;
        }

        .colab-data-name {
            top: 0px;
            height: 16px;
            opacity: 0.9;
        }

        .colab-data-email {
            top: 22px;
            text-align: left;
            font: 100 12px/24px Roboto;
            letter-spacing: 0;
            color: #000000DE;
            opacity: 0.38;

        }

        .pos-end-of-line {
            position: absolute;
            top: 0px;
            right: 0px;
            display:flex;
            flex-direction: row;

        }
        .pos-remove {
            position: relative;
            top: 4px;
            width: 32px;
            height: 32px;

            border: 1px solid #D3D6D7;
            border-radius: 100px;
            opacity: 1;
        }

        .mat-form-field-appearance-legacy .mat-form-field-underline {
            height: 0px;
        }

        .delete-icon {
            position: absolute;
            top: 4px;
            left: 4px;

            color: #BEC3C4;

        }

    `]
})
export class GameDetailCollaboratorEntryComponent implements OnInit {
    public iAmOwner: Observable<boolean> = this.store.pipe(select(iAmOwner));

    @Input() author: Player;
    @Input() isAbleToDelete: boolean = true;

    @Output() onDelete = new EventEmitter();
    @Output() roleChange = new EventEmitter();


    constructor(public store: Store<State>) {
    }

    ngOnInit() {
        // console.log(this.author);
    }

    delete() {
        this.onDelete.emit(this.author);
    }

    selectionChange(event: any) {
        this.roleChange.emit({
            fullId: this.author.fullId || (this.author as any).account,
            role: event.value
        });

    }
}
