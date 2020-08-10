import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from "@ngrx/store";
import {gameThemeReducer} from "./store/game-theme.reducer";
import {EffectsModule} from "@ngrx/effects";
import {GameThemeEffects} from "./store/game-theme.effects";
import {SelectThemeComponent} from "./modal/select-theme.component";
import {SharedModule} from "../shared/shared.module";
import {MatToolbarModule} from "@angular/material/toolbar";
import {ThemeSettingsComponent} from "./modal/theme-settings.component";
import {GameMessageModule} from "../game-message/game-message.module";



@NgModule({

    imports: [
        SharedModule.forRoot(),
        CommonModule,
        StoreModule.forFeature('game-theme', gameThemeReducer),
        EffectsModule.forFeature([GameThemeEffects]),
        MatToolbarModule,
        GameMessageModule,
    ],
  entryComponents: [SelectThemeComponent, ThemeSettingsComponent],
  declarations: [SelectThemeComponent, ThemeSettingsComponent],
  exports: [SelectThemeComponent, ThemeSettingsComponent],

})
export class GameThemesModule { }
