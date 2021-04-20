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
            <app-subtabs-navbar [items]="subMenuItems"></app-subtabs-navbar>
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
    styles: [`
        /*.full-width-container {*/
        /*  background-color: #F0F4F5; !*todo move up*!*/
        /*}*/


        .gamesContainer-outer {
            margin-right: auto;
            margin-left: auto;
            position: relative;
        }

        .root-tabs > .mat-tab-links > .mat-tab-label-active {
            color: #FFFFFF;
            text-transform: uppercase;
            opacity: 1;
        }

        .connectionsContainer {
            top: 109px;
            left: -8px;
            width: calc(100% + 16px);;
            position: relative;
            display: flex;
            flex-wrap: wrap;
            flex-flow: wrap;
            justify-content: flex-start;
            align-content: center;

        }


        .connectionTile {
            position: relative;
            width: 152px;
            height: 160px;

            background: #FFFFFF 0% 0% no-repeat padding-box;
            box-shadow: 0px 1px 10px #0000001A;
            border-radius: 2px;
            opacity: 1;

            margin: 8px;
        }

        .connectionTilePending {
            position: relative;
            width: 152px;
            height: 160px;

            background: rgba(255, 255, 255, 0.54) 0% 0% no-repeat padding-box;
            box-shadow: 0px 1px 10px #0000001A;
            border-radius: 2px;
            opacity: 1;

            margin: 8px;

        }

        h1 {
            color: rgba(0, 0, 0, 0.5);
        }

        .form-wrapper > * {
            width: 100%;
        }

    `],
    encapsulation: ViewEncapsulation.None
})
export class PlayerOverviewComponent implements OnInit {

    public players: Observable<any> = this.store.pipe(select(getFilteredPlayersSelector));

    allPending: Observable<any> = this.store.pipe(select(getAllPending));

    public filter: string;
    public dispatchAction = new SetFilterAction();

    subMenuItems = [
        {
            routerLink: '/portal/root/connections',
            label: 'CONTACT.ALLCONTACTS'
        },
        {
            routerLink: '/portal/root/pending',
            label: 'CONTACT.PENDING'
        },
    ];

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
