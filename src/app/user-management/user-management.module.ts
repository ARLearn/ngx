import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountMenuDisplayComponent } from './components/account-menu-display/account-menu-display.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {UserEffects} from './store/portal-user.effects';
import {reducers} from './store/portal-user.reducer';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
// import {MatProgressButtonsModule} from 'mat-progress-buttons';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import { UserConfigComponent } from './components/user-config/user-config.component';

@NgModule({
  imports: [
    SharedModule.forRoot(),
    StoreModule.forFeature('user', reducers),
    EffectsModule.forFeature([UserEffects]),
    MatCardModule,
    MatMenuModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    // MatProgressButtonsModule,
    MatButtonModule
  ],
  exports: [AccountMenuDisplayComponent],
  declarations: [AccountMenuDisplayComponent, UserConfigComponent]
})
export class UserManagementModule { }
