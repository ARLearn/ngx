import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../core/reducers';
import {MatDialog} from '@angular/material/dialog';
import {
    AddContactRequestAction,
    LoadPendingContactsRequestAction,
    PlayerLoadRequestAction,
    RemoveFriendRequestAction, RemovePendingContactsRequestAction, ResendPendingRequestedAction, SetFilterAction
} from '../../store/player.actions';
import {FriendAddDialogComponent} from '../../components/friend-add-dialog/friend-add-dialog.component';
import {getAllPending, getAllPlayers, getFilteredPlayersSelector, hasPending} from '../../store/player.selector';
import {Observable} from "rxjs";
import {invitationId} from "../../../core/selectors/router.selector";

@Component({
    selector: 'app-player-overview',
    template: `
        <app-top-level-navbar [title]="'CONTACT.CONTACTS'|translate">
            <div class="button-placeholder">
                <div class="button-center">
                    <button color="accent" mat-fab (click)="addContact()">
                        <mat-icon>add</mat-icon>
                    </button>
                </div>
            </div>
            <div class="subtabs">
                <nav mat-tab-nav-bar [backgroundColor]="'primary'">
                    <a mat-tab-link
                       routerLinkActive #rla="routerLinkActive"
                       [active]="rla.isActive"
                       [routerLink]="'/portal/root/connections'">{{'CONTACT.ALLCONTACTS'|translate}}</a>
                    <a mat-tab-link
                       routerLinkActive #rlap="routerLinkActive"
                       [active]="rlap.isActive"
                       [routerLink]="'/portal/root/pending'"> {{'CONTACT.PENDING'|translate}} </a>

                </nav>
            </div>
        </app-top-level-navbar>
        <div class="full-width-container">
            <div class="maxwidth">
                <div class="gamesContainer-outer">
                    <app-search-button
                            [placeholder]="'CONTACT.START_TYPING_TO_SEARCH' | translate"
                            [dispatchAction]="dispatchAction"
                            [filter]="filter"
                    >
                    </app-search-button>
                    <!--                    <mat-form-field class="search" appearance="outline">-->
                    <!--                        <mat-label>Search</mat-label>-->
                    <!--                        <input matInput placeholder="Start typing to search connections ..."-->
                    <!--                               [(ngModel)]="filter"-->
                    <!--                               (input)="onFilterChange($event.target.value)"-->
                    <!--                        >-->
                    <!--                        <mat-icon matPrefix>search</mat-icon>-->

                    <!--                    </mat-form-field>-->


                    <div class="connectionsContainer">

                        <div class="connectionTilePending" *ngFor="let player of (allPending|async)">

                            <app-connection-tile
                                    [pending]="true"
                                    class="gameTile" [player]="player"
                                    (removeInvitation)="removeInvitation(player)"
                                    (reinvite)="reinvite(player)"
                                    (remove)="removeConnection(player)"></app-connection-tile>
                        </div>

                        <div class="connectionTile" *ngFor="let player of (players|async)">
                            <app-connection-tile
                                    class="gameTile"
                                    [pending]="false"
                                    [player]="player"

                                    (remove)="removeConnection(player)"></app-connection-tile>

                        </div>


                    </div>

                </div>
            </div>
        </div>

    `,
    styleUrls: ['./player-overview.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class PlayerOverviewComponent implements OnInit {

    public players: Observable<any> = this.store.pipe(select(getFilteredPlayersSelector));

    allPending: Observable<any> = this.store.pipe(select(getAllPending));

    public filter: string;
    public dispatchAction = new SetFilterAction();

    constructor(
        private store: Store<State>,
        public dialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.store.dispatch(new PlayerLoadRequestAction());
        this.store.dispatch(new LoadPendingContactsRequestAction());

    }

    onFilterChange(filter) {
        if (filter === '') {
            // this.store.dispatch(new SetGamesFilterAction({filters: []}));
        } else {
            // this.store.dispatch(new SetGamesFilterAction({filters: [filter]}));
        }


    }

    addContact() {
        const dialogRef = this.dialog.open(FriendAddDialogComponent, {

            data: {email: ''},
            panelClass: ['modal-fullscreen', "modal-dialog"]
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.log("result is ", result);
                this.store.dispatch(new AddContactRequestAction(result));
            }
        });
    }

    removeConnection(player) {
        this.store.dispatch(new RemoveFriendRequestAction(player));
    }

    removeInvitation(invitation) {
        console.log("remove inv", invitation);
        this.store.dispatch(new RemovePendingContactsRequestAction({id: invitation.localId}));

    }

    reinvite(invitation) {
        console.log("reinvite", invitation);
        this.store.dispatch(new ResendPendingRequestedAction({id: invitation.localId}));

    }

}
