import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/game-messages.reducer';
import {EffectsModule} from '@ngrx/effects';
import {GameMessagesEffects} from './store/game-messages.effects';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {SharedModule} from '../shared/shared.module';
import { ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import {CoreModule} from '../core/core.module';
import {WireflowModule} from 'wireflow';
import {GameDetailScreensComponent} from './pages/game-detail-screens/game-detail-screens.component';
import {GameDetailNavbarComponent} from './component/game-detail/game-detail-navbar/game-detail-navbar.component';
import {GameDetailFlowchartComponent} from './pages/game-detail-flowchart/game-detail-flowchart.component';
import {GameDetailSettingsComponent} from './pages/game-detail-settings/game-detail-settings.component';
import {NewMessageComponent} from './modal/new-message/new-message.component';
import {NewMessageTileComponent} from './modal/new-message/components/new-message-tile/new-message-tile.component';
import {GameDetailPrimSecColorComponent} from './component/game-detail/game-detail-prim-sec-color/game-detail-prim-sec-color.component';
import {GameDetailCollaboratorsComponent} from './component/game-detail/game-detail-collaborators/game-detail-collaborators.component';
import {GameDetailLocationComponent} from './component/game-detail/game-detail-location/game-detail-location.component';
import {GameDetailCollaboratorEntryComponent} from './component/game-detail/game-detail-collaborator-entry/game-detail-collaborator-entry.component';
import {GameDetailCreativeCommonsComponent} from './component/game-detail/game-detail-creative-commons/game-detail-creative-commons.component';
import {GameDetailAccessComponent} from './component/game-detail/game-detail-access/game-detail-access.component';
import {MediaLibraryModule} from "../media-library/media-library.module";
import {MediaLibraryAllFilesComponent} from './pages/media-library-all-files/media-library-all-files.component';
import {AuthModule} from "../auth/auth.module";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
// import { MccColorPickerModule } from 'material-community-components';
import {ColorSketchModule} from 'ngx-color/sketch';
import {ColorPickerModalComponent} from './modal/color-picker-modal/color-picker-modal.component';
import {NewMessageEntryScreenComponent} from './modal/new-message/components/new-message-entry-screen/new-message-entry-screen.component';
import {NewMessageCreateComponent} from './modal/new-message/components/new-message-create/new-message-create.component';
import {MatProgressBarModule} from "@angular/material/progress-bar"; // <color-sketch></color-sketch>

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AddGameCollaboratorComponent} from './modal/add-game-collaborator.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { GameSettingsFieldsComponent } from './component/game-settings-fields.component';
import { GameSettingsPreviewComponent } from './component/game-settings-preview.component';
import {GameMessageModule} from "../game-message/game-message.module";

@NgModule({
    imports: [
        CommonModule,
        SharedModule.forRoot(),
        StoreModule.forFeature('gameMessages', reducers),
        EffectsModule.forFeature([GameMessagesEffects]),
        MediaLibraryModule,
        WireflowModule,
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
        GameMessageModule
    ],
    entryComponents: [
        // NewMessageDialogComponent,
        NewMessageComponent, ColorPickerModalComponent
    ],
    exports: [
        // MessagesGraphComponent, MessagesMapComponent,
        // FullScreenComponent,
        // DragDropScreenComponent,
        GameDetailScreensComponent, GameDetailFlowchartComponent, GameDetailSettingsComponent,
        GameDetailNavbarComponent, MediaLibraryAllFilesComponent
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
        GameDetailScreensComponent, GameDetailNavbarComponent,
        GameDetailFlowchartComponent, GameDetailSettingsComponent, NewMessageComponent,
        NewMessageTileComponent, GameDetailPrimSecColorComponent, GameDetailCollaboratorsComponent, GameDetailLocationComponent,
        GameDetailCollaboratorEntryComponent, GameDetailCreativeCommonsComponent, GameDetailAccessComponent, MediaLibraryAllFilesComponent,
        MediaLibraryAllFilesComponent,
        ColorPickerModalComponent,
        NewMessageEntryScreenComponent,
        NewMessageCreateComponent,
        AddGameCollaboratorComponent,
        GameSettingsFieldsComponent,
        GameSettingsPreviewComponent]
})
export class GameMessagesModule {
}
