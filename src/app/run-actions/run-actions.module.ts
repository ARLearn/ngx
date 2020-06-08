import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActionsOverviewComponent} from './pages/actions-overview.component';
import {GameMessagesModule} from "../game-messages/game-messages.module";
import {MatIconModule} from "@angular/material/icon";
import {SharedModule} from "../shared/shared.module";
import {GameRunsManagementModule} from "../game-runs-management/game-runs-management.module";
import {StoreModule} from "@ngrx/store";
import {arlearnActionReducer} from "./store/arlearn-actions.reducer";
import {EffectsModule} from "@ngrx/effects";
import {ArlearnActionsEffects} from "./store/arlearn-actions.effects";
import { ArlearnActionsTableComponent } from './components/arlearn-actions-table.component';


@NgModule({
    declarations: [ActionsOverviewComponent, ArlearnActionsTableComponent],
    imports: [
        CommonModule,
        GameMessagesModule,
        MatIconModule,
        SharedModule,
        StoreModule.forFeature('run-actions', arlearnActionReducer),
        EffectsModule.forFeature([ArlearnActionsEffects]),

        GameRunsManagementModule
    ]
})
export class RunActionsModule {
}
