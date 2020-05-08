import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSidenavComponent } from './components/admin-sidenav/admin-sidenav.component';
import {GameSidenavComponent} from '../game-management/components/game-sidenav/game-sidenav.component';
import {GameDetailPanelComponent} from '../game-management/components/game-detail-panel/game-detail-panel.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {SharedModule} from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import {RouterModule} from '@angular/router';
import {FeaturedGamesModule} from './featured-games/featured-games.module';

@NgModule({
  imports: [
    SharedModule.forRoot(),
    BrowserAnimationsModule,
    CdkAccordionModule,
    MatIconModule,
    RouterModule,
    FeaturedGamesModule
  ],
  exports: [AdminSidenavComponent],
  declarations: [AdminSidenavComponent]
})
export class AdminModule { }
