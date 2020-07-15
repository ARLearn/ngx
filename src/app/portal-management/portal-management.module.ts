import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ManageGameLibraryComponent } from './pages/manage-game-library.component';
import { ManageUsersComponent } from './pages/manage-users.component';
import { SharedModule } from "../shared/shared.module";
import { PortalGamesEffects } from './store/portal-games.effects';
import { reducers } from './store/portal-games.reducer';


@NgModule({
  declarations: [ManageGameLibraryComponent, ManageUsersComponent],
  imports: [
    SharedModule.forChild(),
    CommonModule,
    StoreModule.forFeature('portalGames', reducers),
    EffectsModule.forFeature([PortalGamesEffects]),
  ],
  exports: [ManageGameLibraryComponent, ManageUsersComponent],
})
export class PortalManagementModule { }
