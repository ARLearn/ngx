import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {MatToolbarModule} from "@angular/material/toolbar";
import {gameThemeReducer} from "./store/game-theme.reducer";
import {GameThemeEffects} from "./store/game-theme.effects";
import {SelectThemeComponent} from "./modal/select-theme.component";
import {ThemeSettingsComponent} from "./modal/theme-settings.component";
import {GameMessageModule} from "../game-message/game-message.module";
import {CreateThemeNameModalComponent} from "./modal/create-theme/create-theme-name-modal.component";
import {CreateThemeSettingsComponent} from "./modal/create-theme/create-theme-settings.component";
import {SharedModule} from "../shared/shared.module";
import {ThemeFilePickerComponent} from "./modal/create-theme/theme-file-picker.component";



@NgModule({
    imports: [
        SharedModule.forRoot(),
        CommonModule,
        StoreModule.forFeature('game-theme', gameThemeReducer),
        EffectsModule.forFeature([GameThemeEffects]),
        MatToolbarModule,
        GameMessageModule,
    ],
  entryComponents: [
      SelectThemeComponent,
      ThemeSettingsComponent,
      CreateThemeNameModalComponent,
      CreateThemeSettingsComponent,
  ],
  declarations: [
      SelectThemeComponent,
      ThemeSettingsComponent,
      CreateThemeNameModalComponent,
      CreateThemeSettingsComponent,
      ThemeFilePickerComponent,
  ],
  exports: [
      SelectThemeComponent,
      ThemeSettingsComponent,
      CreateThemeNameModalComponent,
      CreateThemeSettingsComponent,
  ],

})
export class GameThemesModule { }
