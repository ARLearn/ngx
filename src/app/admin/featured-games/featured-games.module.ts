import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturedGamesOverviewComponent } from './pages/featured-games-overview/featured-games-overview.component';
import {SharedModule} from '../../shared/shared.module';
import { FeaturedGamesTableComponent } from './components/featured-games-table/featured-games-table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/featured-games.reducer';
import {EffectsModule} from '@ngrx/effects';
import {FeaturedGamesEffects} from './store/featured-games.effects';


@NgModule({
  imports: [
    SharedModule.forRoot(),
    MatTableModule, MatPaginatorModule, MatSortModule, MatIconModule, MatButtonModule,
    StoreModule.forFeature('adminFeaturedGames', reducers),
    EffectsModule.forFeature([FeaturedGamesEffects]),
  ],
  exports: [FeaturedGamesOverviewComponent],
  declarations: [FeaturedGamesOverviewComponent, FeaturedGamesTableComponent]
})
export class FeaturedGamesModule { }
