import {NgModule} from '@angular/core';
import {GamesListComponent} from './pages/games-list/games-list.component';
import {GameEffects} from './store/game.effects';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {reducers} from './store/game.reducer';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {GameListTableComponent} from './components/game-list-table/game-list-table.component';
import {GameHeaderButtonsComponent} from './components/game-header-buttons/game-header-buttons.component';
import {GameAddDialogComponent} from './components/game-add-dialog/game-add-dialog.component';
import {FormsModule} from '@angular/forms';
import {GameManagementModule} from '../game-management/game-management.module';
import {GameImportDialogComponent} from './components/game-import-dialog/game-import-dialog.component';
import {GameDeleteDialogComponent} from './components/game-delete-dialog/game-delete-dialog.component';
import {NewGameComponent} from './modal/new-game/new-game.component';
import {NewGamePatternTileComponent} from './modal/new-game/components/new-game-pattern-tile/new-game-pattern-tile.component';
import {CreateGameWithTitleComponent} from './modal/new-game/components/create-game-with-title/create-game-with-title.component';
import {MatMenuModule} from "@angular/material/menu";
import {NewGameEntryScreenComponent} from './modal/new-game/components/new-game-entry-screen/new-game-entry-screen.component';
import {GamePatternsContainerComponent} from './modal/new-game/components/game-patterns-container/game-patterns-container.component';
import {GamePatternsTileComponent} from './modal/new-game/components/game-patterns-tile/game-patterns-tile.component';


@NgModule({
    imports: [
        SharedModule.forRoot(),
        MatTableModule, MatPaginatorModule, MatSortModule, MatIconModule, MatButtonModule,
        MatDialogModule,
        StoreModule.forFeature('game', reducers),
        EffectsModule.forFeature([GameEffects]),
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        RouterModule,
        GameManagementModule,
        MatMenuModule,
    ],
    entryComponents: [
        GameAddDialogComponent, GameImportDialogComponent, GameDeleteDialogComponent,
        NewGameComponent
    ],
    exports: [GamesListComponent],
    declarations: [GamesListComponent, GameListTableComponent, GameHeaderButtonsComponent, GameAddDialogComponent,
        GameImportDialogComponent, GameDeleteDialogComponent, NewGameComponent,
        NewGamePatternTileComponent, CreateGameWithTitleComponent, NewGameEntryScreenComponent, GamePatternsContainerComponent, GamePatternsTileComponent]
})
export class GamesManagementModule {
}
