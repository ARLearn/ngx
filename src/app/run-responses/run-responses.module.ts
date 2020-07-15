import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from "@angular/material/table";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { MatToolbarModule } from "@angular/material/toolbar";
import { NgxAudioPlayerModule } from "ngx-audio-player";
import { ResponsesOverviewComponent } from "./pages/responses-overview.component";
import { GameRunsManagementModule } from "../game-runs-management/game-runs-management.module";
import { GameMessagesModule } from "../game-messages/game-messages.module";
import { ArlearnResponsesTableComponent } from "./components/arlearn-responses-table.component";
import { runResponsesReducer } from "./store/run-responses.reducer";
import { RunResponsesEffects } from "./store/run-responses.effects";
import { SharedModule } from "../shared/shared.module";
import { GameMessageModule } from "../game-message/game-message.module";
import { PhotoGalleryComponent } from './components/photo-gallery.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AudioGalleryComponent } from './components/audio-gallery.component';

@NgModule({
  declarations: [ResponsesOverviewComponent, ArlearnResponsesTableComponent, PhotoGalleryComponent, AudioGalleryComponent],

    imports: [
        CommonModule,
        GameRunsManagementModule,
        GameMessagesModule,
        MatTableModule,
        StoreModule.forFeature('run-responses', runResponsesReducer),
        EffectsModule.forFeature([RunResponsesEffects]),
        SharedModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        GameMessageModule,
        NgxAudioPlayerModule,
    ]
})
export class RunResponsesModule { }
