import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/game-messages.reducer';
import {EffectsModule} from '@ngrx/effects';
import {GameMessagesEffects} from './store/game-messages.effects';

import {SharedModule} from '../shared/shared.module';
import { ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import {CoreModule} from '../core/core.module';
import {WireflowModule} from '@arlearn/nbd-kien-wireflow';
import {GameDetailScreensComponent} from './pages/game-detail-screens/game-detail-screens.component';
import {GameDetailFlowchartComponent} from './pages/game-detail-flowchart/game-detail-flowchart.component';
import {NewMessageComponent} from './modal/new-message/new-message.component';
import {NewMessageTileComponent} from './modal/new-message/components/new-message-tile/new-message-tile.component';
import {MediaLibraryModule} from "../media-library/media-library.module";
import {MediaLibraryAllFilesComponent} from './pages/media-library-all-files/media-library-all-files.component';
import {AuthModule} from "../auth/auth.module";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";

import {ColorSketchModule} from 'ngx-color/sketch';
import {ColorPickerModalComponent} from './modal/color-picker-modal/color-picker-modal.component';
import {NewMessageEntryScreenComponent} from './modal/new-message/components/new-message-entry-screen/new-message-entry-screen.component';
import {NewMessageCreateComponent} from './modal/new-message/components/new-message-create/new-message-create.component';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AddGameCollaboratorComponent} from './modal/add-game-collaborator.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {GameMessageModule} from "../game-message/game-message.module";
import {GameDisappearFlowchartComponent} from "./pages/game.disappear.flowchart";
import {GameManagementModule} from "../game-management/game-management.module";
import { environment } from '../../environments/environment';


@NgModule({
    imports: [
        CommonModule,
        SharedModule.forRoot(),
        StoreModule.forFeature('gameMessages', reducers),
        EffectsModule.forFeature([GameMessagesEffects]),
        MediaLibraryModule,
        WireflowModule.forRoot({
            gMapKey: environment.apiKey,
        }),
        AuthModule,
        MatMenuModule,
        MatCheckboxModule,
        MatDividerModule,
        MatExpansionModule,
        CoreModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        ColorSketchModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        GameMessageModule,
        GameManagementModule
    ],
    entryComponents: [
        // NewMessageDialogComponent,
        NewMessageComponent, ColorPickerModalComponent
    ],
    exports: [
        // MessagesGraphComponent, MessagesMapComponent,
        // FullScreenComponent,
        // DragDropScreenComponent,
        GameDetailScreensComponent, GameDetailFlowchartComponent, //GameDetailSettingsComponent,
        MediaLibraryAllFilesComponent
    ],
    declarations: [
        // MessageTableComponent,
        // MessageCardComponent,
        // FiledropComponent,
        // NewMessageDialogComponent,
        // MessageIconComponent,
        // MessageCardNarratorComponent,        MessageCardVideoComponent, MessageCardSingleChoiceComponent, SingleChoiceAnswerComponent,
        // MessageCardMultipleChoiceComponent,
        // MessagePreviewComponent,
        // MessagesGraphComponent,
        // MessageDependencyComponent,
        // MessageCardGenericComponent,
        // MessageActionDependencyComponent,
        // SingleChoicePreviewComponent,
        // SingleChoiceCorrectPreviewComponent,
        // SingleChoiceWrongPreviewComponent, MessagesMapComponent,
        // VideoPreviewComponent,
        // FullScreenComponent,
        // DragDropScreenComponent,
        // SingleChoiceImagePreviewComponent, MultipleChoiceImagePreviewComponent, AudioPreviewComponent, QrScannerPreviewComponent,
        // MessageCardSingleChoiceImageComponent, MessageCardMultipleChoiceImageComponent,
        GameDetailScreensComponent,
        GameDetailFlowchartComponent, //GameDetailSettingsComponent,
        NewMessageComponent,
        NewMessageTileComponent,

        MediaLibraryAllFilesComponent,
        MediaLibraryAllFilesComponent,
        ColorPickerModalComponent,
        NewMessageEntryScreenComponent,
        NewMessageCreateComponent,
        AddGameCollaboratorComponent,

        GameDisappearFlowchartComponent
    ]
})
export class GameMessagesModule {
}
