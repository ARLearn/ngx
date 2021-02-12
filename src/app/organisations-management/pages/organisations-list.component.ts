import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../core/reducers";
import {AddAll, CreateOrganisation, Query, UpdateOrganisationExpirationAction} from "../store/organisations.actions";
import {AddUserDialogComponent} from "../../portal-user-management/components/add-user-dialog.component";
import {CreateAccountRequest} from "../../portal-user-management/store/portal-users.actions";
import {MatDialog} from "@angular/material/dialog";
import {Subscription} from "rxjs";
import {AddOrganizationDialogComponent} from "../components/add-organization-dialog.component";
import {SelectionModel} from "@angular/cdk/collections";
import {Player} from "../../player-management/store/player.state";
import {Organisation} from '../store/organisations.state';
import {SetExpireDateDialogComponent} from "../../portal-user-management/components/set-expire-date-dialog.component";

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
                <div class="d-flex align-items-center">
                    <div class="selects">
                         <span>
                            {{ selection.selected.length }} {{ 'SELECTED' | translate }} >
                         </span>
                        <button class="actions-btn" mat-flat-button color="primary"
                                [matMenuTriggerFor]="menu"
                                [disabled]="selection.selected.length === 0">{{ 'PORTAL_MANAGEMENT.USERS.ACTION' | translate }}
                            <mat-icon>keyboard_arrow_down</mat-icon>
                        </button>
                        <mat-menu #menu="matMenu">
                            <button mat-menu-item
                                    (click)="setExpireDateToSelectedUsers()">{{ 'PORTAL_MANAGEMENT.USERS.ACTIONS_SET_EXIPRATION_DATE' | translate }}</button>

                        </mat-menu>
                    </div>

                </div>
            </div>
            <app-organisation-table
                    [selection]="selection"
            >

            </app-organisation-table>

        </div>
    `,
    styles: [`
        .selects {
            border-right: 1px solid #e0e0e0;
            padding-right: 10px;
            margin-right: 30px;
        }
    `]
})
export class OrganisationsListComponent implements OnInit {
    selection = new SelectionModel<Organisation>(true, []);
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

    setExpireDateToSelectedUsers() {
        const dialogRef = this.dialog.open(SetExpireDateDialogComponent, {
            panelClass: ['modal-fullscreen', "modal-dialog"],
        });

        this.subscription.add(dialogRef.componentInstance.submit.subscribe((value) => {
            this.selection.selected.forEach(x => this.store.dispatch(new UpdateOrganisationExpirationAction({
                id: x.id,
                expirationDate: value.date.getTime()
            })));
            dialogRef.close();
        }));
    }
}
