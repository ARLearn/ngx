import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../core/reducers";
import {AddAll, CreateOrganisation, Query} from "../store/organisations.actions";
import {AddUserDialogComponent} from "../../portal-user-management/components/add-user-dialog.component";
import {CreateAccountRequest} from "../../portal-user-management/store/portal-users.actions";
import {MatDialog} from "@angular/material/dialog";
import {Subscription} from "rxjs";
import {AddOrganizationDialogComponent} from "../components/add-organization-dialog.component";

@Component({
    selector: 'app-organisations-list',
    template: `
        <app-top-level-navbar [title]="'Portaal beheer - Organizaties'">
            <app-subtabs-navbar [items]="subMenuItems"></app-subtabs-navbar>

            <div class="button-placeholder" (click)="addOrganisation()">
                <div class="button-center">
                    <button color="accent" mat-fab>
                        <mat-icon>add</mat-icon>
                    </button>
                </div>
            </div>
        </app-top-level-navbar>
        <div class="users maxwidth">
            <div class="mb-4 mt-5 d-flex align-items-center justify-content-between">
                <app-organisation-table>

                </app-organisation-table>
            </div>
        </div>
    `,
    styles: []
})
export class OrganisationsListComponent implements OnInit {
    subMenuItems = [
        {
            routerLink: '/portal/root/portal',
            label: 'COMMON.GAMES'
        },
        {
            routerLink: '/portal/root/usrmgt',
            label: 'PORTAL_MANAGEMENT.USERS.MENU'
        },
        {
            routerLink: '/portal/root/images',
            label: 'PORTAL_MANAGEMENT.IMAGES.MENU'
        },
        {
            routerLink: '/portal/organisations',
            label: 'PORTAL_MANAGEMENT.ORGANISATIONS.MENU'
        },
    ];
    private subscription = new Subscription();

    constructor(public dialog: MatDialog, private store: Store<State>) {
    }

    ngOnInit(): void {
        this.store.dispatch(new Query());
    }

    addOrganisation() {
        const dialogRef = this.dialog.open(AddOrganizationDialogComponent, {
            panelClass: ['modal-fullscreen', "modal-dialog"],
        });
        this.subscription.add(dialogRef.componentInstance.submit.subscribe((result) => {
            this.store.dispatch(new CreateOrganisation(result));
        }));
    }
}
