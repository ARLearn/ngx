import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {GameService} from './services/game.service';

import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {EffectsModule} from '@ngrx/effects';
import {RouterEffects} from './effects/router.effects';
import {ErrorInterceptor, HttpTokenInterceptor} from './services/http.token.interceptor';
import {GameMessagesService} from './services/game-messages.service';
import {RunService} from './services/run.service';
import {PlayerService} from './services/player.service';
import {AccountService} from './services/account.service';
import {MediaLibraryService} from "./services/medialibrary.service";

export const COMPONENTS = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([RouterEffects])
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
        ngModule: CoreModule,
        providers: [
            {
                provide: HTTP_INTERCEPTORS,
                useClass: HttpTokenInterceptor,
                multi: true
            },
            {
                provide: HTTP_INTERCEPTORS,
                useClass: ErrorInterceptor,
                multi: true
            },
            GameService,
            RunService,
            GameMessagesService,
            MediaLibraryService,
            PlayerService,
            AccountService
        ]
    };
}
}
