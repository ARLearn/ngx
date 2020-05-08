import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {reducers} from './core/reducers/';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {HomepageModule} from './pages/homepage/homepage';
import {ComponentPageTitle} from './pages/page-title/page-title';
import {LoginScreenComponent} from './pages/login-screen/login-screen.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {AgmCoreModule} from '@agm/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireStorageModule} from 'angularfire2/storage';

import {AngularFireAuthModule} from 'angularfire2/auth';
import {AuthModule} from './auth/auth.module';
import {HttpTokenInterceptor} from './core/services/http.token.interceptor';
import {AuthGuard} from './auth/guards/auth.guard';

import {TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {SharedModule} from './shared/shared.module';

import {GamesManagementModule} from './games-management/games-management.module';
import {GameMessagesModule} from './game-messages/game-messages.module';
import {AdminModule} from './admin/admin.module';
import {GameRunsManagementModule} from './game-runs-management/game-runs-management.module';
import {PlayerManagementModule} from './player-management/player-management.module';
import {EffectsModule} from '@ngrx/effects';
import {GameMessageModule} from './game-message/game-message.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {LoginScreenNoSocialComponent} from './pages/login-screen/login-screen-no-social.component';
import {APP_ROUTES} from './routes';

export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient);
}


@NgModule({
    declarations: [AppComponent, LoginScreenComponent, LoginScreenNoSocialComponent],
    exports: [
        TranslateModule
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        SharedModule.forRoot(),
        MaterialModule,
        MatTabsModule,
        MatTooltipModule,
        RouterModule.forRoot(APP_ROUTES, {useHash: true}),
        HttpClientModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([]),
        CoreModule.forRoot(),
        StoreRouterConnectingModule.forRoot({
            stateKey: 'router' // name of reducer key
        }),
        StoreDevtoolsModule.instrument({
            name: 'Youplay dev tools',
            logOnly: environment.production,

        }),
        MatCheckboxModule,
        AdminModule,
        AgmCoreModule.forRoot({
            apiKey: environment.apiKey
        }),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireAuthModule,
        HomepageModule,
        AuthModule,
        GameRunsManagementModule,
        GamesManagementModule,
        GameMessagesModule,
        GameMessageModule,
        PlayerManagementModule,
        FontAwesomeModule
    ],
    providers: [
        ComponentPageTitle,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpTokenInterceptor,
            multi: true
        },
        HttpClient,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
