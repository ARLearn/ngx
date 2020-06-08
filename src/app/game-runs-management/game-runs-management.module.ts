import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RunOverviewComponent} from './pages/run-overview.component';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/game-runs.reducer';
import {EffectsModule} from '@ngrx/effects';
import {SharedModule} from '../shared/shared.module';
import {GameRunsEffects} from './store/game-runs.effects';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NewRunDialogComponent} from './components/new-run-dialog/new-run-dialog.component';
import {RunsTableComponent} from './components/runs-table/runs-table.component';
// import {PlayerTableComponent} from './components/player-table/player-table.component';
import {AddPlayerDialogComponent} from './components/add-player-dialog.component';
import {MatMenuModule} from '@angular/material/menu';
import {GameMessagesModule} from "../game-messages/game-messages.module";
import {RunPlayersPageComponent} from './pages/run-players-page.component';
import {RunResultsPageComponent} from './pages/run-results-page.component';
import {RunTabSelectComponent} from './components/run-tab-select.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {RunSettingsPageComponent} from './pages/run-settings-page.component';
import {SettingsFieldsComponent} from './components/settings-fields.component';

@NgModule({
    imports: [
        SharedModule.forRoot(),
        StoreModule.forFeature('gameRuns', reducers),
        EffectsModule.forFeature([GameRunsEffects]),
        MatButtonModule,
        MatIconModule,
        MatTableModule, MatPaginatorModule, MatSortModule,
        RouterModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatDialogModule,
        MatSelectModule,
        MatMenuModule,
        GameMessagesModule,
        MatAutocompleteModule,
        ReactiveFormsModule

    ],
    entryComponents: [
        NewRunDialogComponent, AddPlayerDialogComponent
    ],
    exports: [
        RunOverviewComponent, RunPlayersPageComponent,
        RunResultsPageComponent, RunSettingsPageComponent, RunTabSelectComponent],
    declarations: [
        RunOverviewComponent, NewRunDialogComponent, RunsTableComponent,
        AddPlayerDialogComponent, RunPlayersPageComponent,
        RunResultsPageComponent, RunTabSelectComponent, RunSettingsPageComponent,
        SettingsFieldsComponent]
})
export class GameRunsManagementModule {
}
