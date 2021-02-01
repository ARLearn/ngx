import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from "@ngrx/store";
import { ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";

import { ManageUsersComponent } from "./pages/manage-users.component";
import { portalUserReducer } from "./store/portal-users.reducer";
import { PortalUsersEffects } from "./store/portal-users.effects";
import { SharedModule } from "../shared/shared.module";
import { ManageUserComponent } from "./pages/manage-user.component";
import { AddUserDialogComponent } from "./components/add-user-dialog.component";
import { ConfirmDialogComponent } from "./components/confirm-dialog.component";
import { SetExpireDateDialogComponent } from "./components/set-expire-date-dialog.component";
import { ManageUsersTableComponent } from './components/manage-users-table.component';
import { SetOrganisationDialogComponent } from './components/set-organisation-dialog.component';



@NgModule({
  declarations: [
    ManageUsersComponent,
    ManageUserComponent,
    AddUserDialogComponent,
    ConfirmDialogComponent,
    SetExpireDateDialogComponent,
    ManageUsersTableComponent,
    SetOrganisationDialogComponent,
  ],
  imports: [
    SharedModule.forChild(),
    CommonModule,
    StoreModule.forFeature('portal-users', portalUserReducer),
    EffectsModule.forFeature([PortalUsersEffects]),
    ReactiveFormsModule,
  ],
    exports: [
        ManageUsersComponent,
        ManageUsersTableComponent
    ],
  entryComponents: [
      AddUserDialogComponent,
    ConfirmDialogComponent,
    SetExpireDateDialogComponent,
  ]
})
export class PortalUserManagementModule { }
