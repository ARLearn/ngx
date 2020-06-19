import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScreenDetailComponent} from './pages/screen-detail/screen-detail.component';
import {SharedModule} from '../shared/shared.module';
import {PreviewPaneComponent} from './component/preview-pane/preview-pane.component';
import {PreviewPaneHeaderComponent} from './component/preview-pane-header/preview-pane-header.component';
import {PreviewPaneMobileViewComponent} from './component/preview-pane-mobile-view/preview-pane-mobile-view.component';
import {ScreenEditorNavbarComponent} from './component/screen-editor-navbar/screen-editor-navbar.component';
import {ScreenEditorComponent} from './component/screen-editor/screen-editor.component';
import {ScreenEditorTypeSelectComponent} from './component/screen-editor-type-select/screen-editor-type-select.component';
import {ScreenEditorTypeNarratorComponent} from './component/screen-editor-type-select/screen-editor-type-narrator/screen-editor-type-narrator.component';
import {ScreenEditorTypeSingleChoiceTestComponent} from './component/screen-editor-type-select/screen-editor-type-single-choice-test/screen-editor-type-single-choice-test.component';
import {ScreenEditorTypeMultipleChoiceTestComponent} from './component/screen-editor-type-select/screen-editor-type-multiple-choice-test/screen-editor-type-multiple-choice-test.component';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/game-message.reducer';
import {EffectsModule} from '@ngrx/effects';
import {GameMessageEffects} from './store/game-message.effects';
import {PickFileInputComponent} from './component/screen-editor-type-select/component/pick-file-input/pick-file-input.component';
import {MobilePreviewNarratorComponent} from './component/preview-pane-mobile-view/mobile-preview-narrator/mobile-preview-narrator.component';
import {PickLocationOnMapComponent} from './component/screen-editor-type-select/component/pick-location-on-map/pick-location-on-map.component';
import {CreateLabelComponent} from './component/screen-editor-type-select/component/create-label/create-label.component';
import {ScreenEditorTypeVideoObjectComponent} from './component/screen-editor-type-select/screen-editor-type-video-object/screen-editor-type-video-object.component';
import {ScreenEditorTypeScanTagComponent} from './component/screen-editor-type-select/screen-editor-type-scan-tag/screen-editor-type-scan-tag.component';
import {ScreenEditorTypeSingleChoiceImageComponent} from './component/screen-editor-type-select/screen-editor-type-single-choice-image/screen-editor-type-single-choice-image.component';
import {ScreenEditorTypeMultipleChoiceImageComponent} from './component/screen-editor-type-select/screen-editor-type-multiple-choice-image/screen-editor-type-multiple-choice-image.component';
import {AnswerComponentComponent} from './component/screen-editor-type-select/component/answer-component/answer-component.component';
import {DependencyReadTempComponent} from './component/screen-editor-type-select/component/dependency-read-temp/dependency-read-temp.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {MobilePreviewVideoComponent} from './component/preview-pane-mobile-view/mobile-preview-video/mobile-preview-video.component';
import {MobilePreviewMultipleChoiceComponent} from './component/preview-pane-mobile-view/mobile-preview-multiple-choice/mobile-preview-multiple-choice.component';
import {MobilePreviewMultipleScanComponent} from './component/preview-pane-mobile-view/mobile-preview-multiple-scan/mobile-preview-multiple-scan.component';
import {MediaLibraryModule} from "../media-library/media-library.module";
import {BackgroundImageSelectorComponent} from './component/background-image-selector/background-image-selector.component';
import {MobilePreviewSingleChoiceComponent} from './component/preview-pane-mobile-view/mobile-preview-single-choice/mobile-preview-single-choice.component';
import {ChangeScreenPreviewDirective} from "./directives/change-screen-preview.directive";
import { MobilePreviewAnswerFeedbackComponent } from './component/preview-pane-mobile-view/mobile-preview-answer-feedback/mobile-preview-answer-feedback.component';
import { MobilePreviewMultipleChoiceImageComponent } from './component/preview-pane-mobile-view/mobile-preview-multiple-choice-image/mobile-preview-multiple-choice-image.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { PreviewNavbarComponent } from './component/preview-pane-mobile-view/components/preview-navbar/preview-navbar.component';
import { MobilePreviewScanTageComponent } from './component/preview-pane-mobile-view/mobile-preview-scan-tage/mobile-preview-scan-tage.component';
import { McImagePreviewHeaderComponent } from './component/preview-pane-header/mc-image-preview-header.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ClipboardModule} from "@angular/cdk/clipboard";
import { QRCodeModule } from 'angular2-qrcode';
@NgModule({
    declarations: [ScreenDetailComponent, PreviewPaneComponent, PreviewPaneHeaderComponent,
        PreviewPaneMobileViewComponent, ScreenEditorNavbarComponent, ScreenEditorComponent,
        ScreenEditorTypeSelectComponent, ScreenEditorTypeNarratorComponent, ChangeScreenPreviewDirective,
        ScreenEditorTypeSingleChoiceTestComponent, ScreenEditorTypeMultipleChoiceTestComponent, PickFileInputComponent, MobilePreviewNarratorComponent, PickLocationOnMapComponent, CreateLabelComponent, ScreenEditorTypeVideoObjectComponent, ScreenEditorTypeScanTagComponent, ScreenEditorTypeSingleChoiceImageComponent, ScreenEditorTypeMultipleChoiceImageComponent, AnswerComponentComponent, DependencyReadTempComponent, MobilePreviewVideoComponent, MobilePreviewMultipleChoiceComponent, MobilePreviewMultipleScanComponent, BackgroundImageSelectorComponent, MobilePreviewSingleChoiceComponent, MobilePreviewAnswerFeedbackComponent, MobilePreviewMultipleChoiceImageComponent, PreviewNavbarComponent, MobilePreviewScanTageComponent, McImagePreviewHeaderComponent],
    exports: [ScreenDetailComponent, PreviewPaneComponent, PreviewPaneMobileViewComponent],
    imports: [
        CommonModule,
        SharedModule.forRoot(),
        StoreModule.forFeature('gameMessage', reducers),
        EffectsModule.forFeature([GameMessageEffects]),
        MediaLibraryModule,
        MatAutocompleteModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatGridListModule,
        MatTooltipModule,
        ClipboardModule,
        QRCodeModule,
    ]
})
export class GameMessageModule {
}

