import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ManageUsersComponent} from "./pages/manage-users.component";
import {StoreModule} from "@ngrx/store";
import {portalUserReducer} from "./store/portal-users.reducer";
import {EffectsModule} from "@ngrx/effects";
import {PortalUsersEffects} from "./store/portal-users.effects";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [ManageUsersComponent],
  imports: [
    SharedModule.forChild(),
    CommonModule,
    StoreModule.forFeature('portal-users', portalUserReducer),
    EffectsModule.forFeature([PortalUsersEffects]),
  ],
  exports: [ManageUsersComponent],
})
export class PortalUserManagementModule { }
