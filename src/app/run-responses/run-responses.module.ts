import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ResponsesOverviewComponent} from "./pages/responses-overview.component";
import {GameRunsManagementModule} from "../game-runs-management/game-runs-management.module";
import {GameMessagesModule} from "../game-messages/game-messages.module";
import {ArlearnResponsesTableComponent} from "./components/arlearn-responses-table.component";
import {MatTableModule} from "@angular/material/table";
import {StoreModule} from "@ngrx/store";
import {runResponsesReducer} from "./store/run-responses.reducer";
import {EffectsModule} from "@ngrx/effects";
import {RunResponsesEffects} from "./store/run-responses.effects";

@NgModule({
  declarations: [ResponsesOverviewComponent, ArlearnResponsesTableComponent],
  imports: [
    CommonModule,
    GameRunsManagementModule,
    GameMessagesModule,
    StoreModule.forFeature('run-responses', runResponsesReducer),
    EffectsModule.forFeature([RunResponsesEffects]),
    MatTableModule,
  ]
})
export class RunResponsesModule { }
