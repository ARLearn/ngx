import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageUsersComponent } from "./pages/manage-users.component";
import { StoreModule } from "@ngrx/store";
import { portalUserReducer } from "./store/portal-users.reducer";
import { EffectsModule } from "@ngrx/effects";
import { PortalUsersEffects } from "./store/portal-users.effects";
import { SharedModule } from "../shared/shared.module";
import { ManageUserComponent } from "./pages/manage-user.component";
import { AddUserDialogComponent } from "./components/add-user-dialog.component";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [ManageUsersComponent, ManageUserComponent, AddUserDialogComponent],
  imports: [
    SharedModule.forChild(),
    CommonModule,
    StoreModule.forFeature('portal-users', portalUserReducer),
    EffectsModule.forFeature([PortalUsersEffects]),
    ReactiveFormsModule,
  ],
  exports: [ManageUsersComponent],
  entryComponents: [AddUserDialogComponent]
})
export class PortalUserManagementModule { }
