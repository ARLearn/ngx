import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AddGameAuthorRequestAction, LoadGameAuthorRequestAction} from "../../../store/current-game.actions";
import {select, Store} from "@ngrx/store";
import {State} from "../../../../core/reducers";
import {Observable} from "rxjs";
import {gameAccessWithAccount, gameMyAccessWithAccount, iAmOwner, iCanWrite} from "../../../store/current-game.selector";
import {AddPlayerDialogComponent} from "../../../../game-runs-management/components/add-player-dialog.component";
import {AddUserToRunRequestAction} from "../../../../game-runs-management/store/game-runs.actions";
import {PlayerLoadRequestAction} from "../../../../player-management/store/player.actions";
import {MatDialog} from "@angular/material/dialog";
import {AddGameCollaboratorComponent} from "../../../../game-messages/modal/add-game-collaborator.component";

@Component({
    selector: 'app-game-detail-collaborators',
    template: `
        <div class="collaborators-container">

            <div class="collaborators-header">
                <div class="collaborators color-600 font-regular-24-24-roboto">
                    {{'GAME.COLLABORATOR'|translate}}
                </div>
                <div
                        *ngIf="iAmOwner|async"
                        class="add-collaborator-button color-700 font-regular-11-15-roboto">
                    <button mat-button (click)="addCollaborator()">{{'GAME.ADD_COLLABORATOR'|translate}}</button>
                </div>
            </div>
            <div class="collaborators-small font-regular-11-15-roboto">
                {{'CONTACT.COLLABORATORS' | translate}}
            </div>
            <app-game-detail-collaborator-entry *ngFor="let game_author of gameAuthors"
                                                [author]="game_author"
                                                [isAbleToDelete]="gameAuthors.length > 1"
                                                (roleChange)="onRoleChange.emit($event)"
                                                (onDelete)="onDelete.emit($event)"
            ></app-game-detail-collaborator-entry>

        </div>
    `,
    styles: [`
        .collaborators-container {
            margin-top: 60px;
        }

        .collaborators-header {
            position: relative;
            width: 100%;
            height: 32px;
        }

        .collaborators {
            text-align: left;
        }

        .add-collaborator-button {
            position: absolute;
            right: 0px;
            top: 0px;
            text-align: right;


            opacity: 1
        }

        .collaborators-small {
            margin-top: 16px;
            text-align: left;
            color: #0000008A;

        }
    `]
})
export class GameDetailCollaboratorsComponent implements OnInit {
    public iCanWrite: Observable<boolean> = this.store.pipe(select(iCanWrite));
    public iAmOwner: Observable<boolean> = this.store.pipe(select(iAmOwner));

    @Input() gameAuthors: any[];
    @Output() onRoleChange = new EventEmitter();
    @Output() onDelete = new EventEmitter();

    constructor(
        private store: Store<State>,
        public dialog: MatDialog
    ) {
    }

    ngOnInit() {
    }

    addCollaborator() {

        const dialogRef = this.dialog.open(AddGameCollaboratorComponent, {
            panelClass: ['modal-fullscreen', "modal-dialog"],
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result && result.fullId) {
                this.store.dispatch(new AddGameAuthorRequestAction({
                    fullId: result.fullId.fullId,
                    role: result.role
                }));
                // this.store.dispatch(new AddUserToRunRequestAction(result.fullId));
            }

        });
    }
}
