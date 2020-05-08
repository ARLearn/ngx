import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../core/reducers";
import {MatDialog} from "@angular/material/dialog";
import {LoadPendingContactsToMeRequestAction} from "../../store/player.actions";
import {getAllPendingToMe, hasPending} from "../../store/player.selector";

@Component({
    selector: 'app-pending-players-overview',
    template: `
        <app-top-level-navbar [title]="'CONTACT.CONTACTS'|translate">

            <div class="subtabs">
                <nav mat-tab-nav-bar [backgroundColor]="'primary'">
                    <a mat-tab-link
                       routerLinkActive #rla="routerLinkActive"
                       [active]="rla.isActive"
                       [routerLink]="'/portal/root/connections'"> {{'CONTACT.ALLCONTACTS'|translate}}</a>
                    <a mat-tab-link
                       routerLinkActive #rlap="routerLinkActive"
                       [active]="rlap.isActive"
                       [routerLink]="'/portal/root/pending'"> {{'CONTACT.PENDING'|translate}} </a>

                </nav>
            </div>
        </app-top-level-navbar>

        <div class="maxwidth">
            <app-invitations-table></app-invitations-table>
        </div>

    `,
    styles: [`
        .subtabs {
            position: absolute;
            top: 96px;
        }

        .mat-tab-links > .mat-tab-label-active {
            color: #FFFFFF;
            text-transform: uppercase;
            opacity: 1;
        }
    `]
})
export class PendingPlayersOverviewComponent implements OnInit {

    constructor(
        private store: Store<State>
    ) {
    }

    ngOnInit() {
        this.store.dispatch(new LoadPendingContactsToMeRequestAction());
    }

}
