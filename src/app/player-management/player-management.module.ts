import {NgModule} from '@angular/core';
import {PlayerOverviewComponent} from './pages/player-overview/player-overview.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {FriendsTableComponent} from './components/friends-table/friends-table.component';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/player.reducer';
import {EffectsModule} from '@ngrx/effects';
import {PlayerEffects} from './store/player.effects';
import {FriendAddDialogComponent} from './components/friend-add-dialog/friend-add-dialog.component';
import {AcceptInvitationComponent} from './pages/accept-invitation/accept-invitation.component';
import {PendingPlayersOverviewComponent} from './pages/pending-players-overview/pending-players-overview.component';
import {InvitationsTableComponent} from './components/invitations-table/invitations-table.component';
import {UserManagementModule} from "../user-management/user-management.module";

@NgModule({
    imports: [
        SharedModule.forRoot(),
        StoreModule.forFeature('players', reducers),
        EffectsModule.forFeature([PlayerEffects]),
        UserManagementModule,

        MatMenuModule,
        MatTableModule, MatPaginatorModule, MatSortModule,
        RouterModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatDialogModule,
    ],
    entryComponents: [FriendAddDialogComponent],
    exports: [PlayerOverviewComponent],
    declarations: [PlayerOverviewComponent, FriendsTableComponent, FriendAddDialogComponent,
        AcceptInvitationComponent, PendingPlayersOverviewComponent, InvitationsTableComponent]
})
export class PlayerManagementModule {
}
