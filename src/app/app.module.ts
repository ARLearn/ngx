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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatSelectModule} from "@angular/material/select";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSliderModule} from "@angular/material/slider";
import {MatNativeDateModule} from "@angular/material/core";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {PortalManagementModule} from "./portal-management/portal-management.module";
import {RunActionsModule} from "./run-actions/run-actions.module";
import {RunResponsesModule} from "./run-responses/run-responses.module";
import {TutorialModule} from "./tutorial/tutorial.module";
import {GameThemesModule} from "./game-themes/game-themes.module";
import {PortalUserManagementModule} from "./portal-user-management/portal-user-management.module";

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
        FormsModule,
        MatSidenavModule,
        ReactiveFormsModule,
        MatGridListModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        MatListModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDividerModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatSliderModule,
        MatNativeDateModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatExpansionModule,
        MatDatepickerModule,
        FormsModule,
        MatSidenavModule,
        ReactiveFormsModule,
        MatGridListModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        MatListModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDividerModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatSliderModule,
        MatNativeDateModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatExpansionModule,
        MatDatepickerModule,
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
        GameThemesModule,
        PlayerManagementModule,
        PortalManagementModule,
        PortalUserManagementModule,
        FontAwesomeModule,
        RunActionsModule,
        RunResponsesModule,
        TutorialModule
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
