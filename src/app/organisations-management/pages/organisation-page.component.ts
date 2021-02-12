import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {Player} from "../../player-management/store/player.state";
import {selectAll, selectedCurrentOrganisationUser, selectedUser} from "../../portal-user-management/store/portal-users.selectors";
import {Store} from "@ngrx/store";
import {State} from "../../core/reducers";
import {selectedOrganisation} from "../store/organisations.selectors";
import {Organisation} from "../store/organisations.state";
import {QueryOne} from "../store/organisations.actions";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {QueryByOrganisation} from "../../portal-user-management/store/portal-users.actions";
import {SetExpireDateDialogComponent} from "../../portal-user-management/components/set-expire-date-dialog.component";
import {UpdateAccountExpirationRequestAction} from "../../player-management/store/player.actions";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-organisation-page',
  template: `
    <app-top-level-navbar [backUrl]="'/portal/organisations'" [title]="(organisation|async)?.name">
      <app-subtabs-navbar [items]="subMenuItems"></app-subtabs-navbar>
    </app-top-level-navbar>
    
    <div class="users maxwidth">
     
      <app-manage-users-table
          [userList]="userList"
          [selection]="selection"
      ></app-manage-users-table>
    </div>
  `,
  styles: [`
  
    `]
})
export class OrganisationPageComponent implements OnInit {
  selection = new SelectionModel<Player>(true, []);
  userList: Observable<Player[]> = this.store.select(selectedCurrentOrganisationUser);

  organisation: Observable<Organisation> = this.store.select(selectedOrganisation);
  constructor(public dialog: MatDialog,
              private store: Store<State>) {}

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

  ngOnInit(): void {
    this.store.dispatch(new QueryOne());
    this.store.dispatch(new QueryByOrganisation());
  }


}
