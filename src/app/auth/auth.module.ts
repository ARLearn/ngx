import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {MatMenuModule} from "@angular/material/menu";

import {LoginComponent} from './pages/login/login.component';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {environment} from '../../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './store/auth.effects';
import {reducers} from './reducers';
import {AuthGuard} from './guards/auth.guard';
import {UnprotectedPageComponent} from './pages/unprotected-page/unprotected-page.component';
import {ProtectedPageComponent} from './pages/protected-page/protected-page.component';
import {AuthService} from './services/auth.service';
import {UserDropDownDisplayComponent} from './components/user-drop-down-display/user-drop-down-display.component';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { AccountInfoComponent } from './pages/account-info/account-info.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        // AuthRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        EffectsModule.forFeature([AuthEffects]),
        StoreModule.forFeature('authFeature', reducers),
        MatMenuModule,
        MatIconModule,
        AngularFirestoreModule,
        AngularFireAuthModule,
        MatButtonModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule
    ],
    exports: [LoginComponent, UserDropDownDisplayComponent, AccountInfoComponent],
    providers: [
        AuthGuard, AuthService
    ],
    declarations: [LoginComponent, UnprotectedPageComponent, ProtectedPageComponent, UserDropDownDisplayComponent, AccountInfoComponent]
})
export class AuthModule {
}
