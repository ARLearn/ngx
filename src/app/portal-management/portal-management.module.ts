import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ManageGameLibraryComponent } from './pages/manage-game-library.component';

import { ManageGameComponent } from './pages/manage-game.component';
import { SharedModule } from "../shared/shared.module";
import { PortalGamesEffects } from './store/portal-games.effects';
import { reducers } from './store/portal-games.reducer';
import { FeaturedImageDragDropComponent } from './components/featured-image-drag-drop.component';


@NgModule({
  declarations: [ManageGameLibraryComponent, ManageGameComponent, FeaturedImageDragDropComponent],
  imports: [
    SharedModule.forChild(),
    CommonModule,
    StoreModule.forFeature('portalGames', reducers),
    EffectsModule.forFeature([PortalGamesEffects]),
  ],
  exports: [ManageGameLibraryComponent, ManageGameComponent],
})
export class PortalManagementModule { }
