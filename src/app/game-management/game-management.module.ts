import {NgModule} from '@angular/core';
import {GameSidenavComponent} from './components/game-sidenav/game-sidenav.component';
import {SharedModule} from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {RouterModule} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import {reducers} from './store/current-game.reducer';
import {CurrentGameEffects} from './store/current-game.effects';
import {StoreModule} from '@ngrx/store';
import { EditorTitleDescriptionComponent } from './components/editor-title-description/editor-title-description.component';
import { GameDetailPanelComponent } from './components/game-detail-panel/game-detail-panel.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {FormsModule} from '@angular/forms';
// import { MatProgressButtonsModule } from 'mat-progress-buttons';
import { EditorLocationComponent } from './components/editor-location/editor-location.component';
import { EditorAccessComponent } from './components/editor-access/editor-access.component';
import { EditorLicenseComponent } from './components/editor-license/editor-license.component';
import {MatRadioModule} from '@angular/material/radio';
import {AgmCoreModule} from '@agm/core';
import {environment} from '../../environments/environment';
import { EditorAuthorsComponent } from './components/editor-authors/editor-authors.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AddAuthorDialogComponent } from './components/add-author-dialog/add-author-dialog.component';

import {MatChipsModule} from '@angular/material/chips';
import { GameDetailSettingsComponent } from './pages/game-detail-settings.component';
import { GameDetailNavbarComponent } from './components/game-detail-navbar.component';
import {AuthModule} from "../auth/auth.module";
import {GameSettingsFieldsComponent} from "./components/game-settings-fields.component";
import {GameSettingsPreviewComponent} from "./components/game-settings-preview.component";
import {GameDisappearFlowchartComponent} from "../game-messages/pages/game.disappear.flowchart";
import {GameThemeSelectorComponent} from "./components/game-theme-selector.component";
import {GameDetailPrimSecColorComponent} from "./components/game-detail/game-detail-prim-sec-color/game-detail-prim-sec-color.component";
import {GameDetailCollaboratorsComponent} from "./components/game-detail/game-detail-collaborators/game-detail-collaborators.component";
import {GameDetailCollaboratorEntryComponent} from "./components/game-detail/game-detail-collaborator-entry/game-detail-collaborator-entry.component";
import {GameDetailAccessComponent} from "./components/game-detail/game-detail-access/game-detail-access.component";
import {GameDetailCreativeCommonsComponent} from "./components/game-detail/game-detail-creative-commons/game-detail-creative-commons.component";
import {GameDetailLocationComponent} from "./components/game-detail/game-detail-location/game-detail-location.component";
import { GameLandingPageComponent } from './component/pages/game-landing-page.component';

@NgModule({
  imports: [
    SharedModule.forRoot(),
    StoreModule.forFeature('currentGame', reducers),
    EffectsModule.forFeature([CurrentGameEffects]),
    MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    BrowserAnimationsModule,
    CdkAccordionModule,
    RouterModule,
    MatSidenavModule,
    MatExpansionModule,
    // MatProgressButtonsModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatChipsModule,
    MatSelectModule,
    AgmCoreModule.forRoot({
      apiKey: environment.apiKey
    }), AuthModule

  ],
  entryComponents: [AddAuthorDialogComponent],
  exports: [GameSidenavComponent, GameDetailPanelComponent, GameDetailSettingsComponent, GameDetailNavbarComponent, GameDetailCollaboratorsComponent],
  declarations: [GameSidenavComponent, EditorTitleDescriptionComponent,
    GameDetailPanelComponent,
    EditorLocationComponent,
    EditorAccessComponent,
    EditorLicenseComponent,
    EditorAuthorsComponent,
    AddAuthorDialogComponent,
    GameDetailSettingsComponent,
    GameDetailNavbarComponent,
    GameSettingsFieldsComponent,
    GameSettingsPreviewComponent,
    GameThemeSelectorComponent,
    GameDetailPrimSecColorComponent,
    GameDetailCollaboratorsComponent, GameDetailLocationComponent,
    GameDetailCollaboratorEntryComponent, GameDetailCreativeCommonsComponent,
    GameDetailAccessComponent,
    GameLandingPageComponent
  ]
})
export class GameManagementModule {
}
