import {Routes} from '@angular/router';
import {LoginScreenComponent} from './pages/login-screen/login-screen.component';
import {GamesListComponent} from './games-management/pages/games-list/games-list.component';
import {FeaturedGamesOverviewComponent} from './admin/featured-games/pages/featured-games-overview/featured-games-overview.component';
import {RunOverviewComponent} from './game-runs-management/pages/run-overview.component';
import {PlayerOverviewComponent} from './player-management/pages/player-overview/player-overview.component';
import {AcceptInvitationComponent} from './player-management/pages/accept-invitation/accept-invitation.component';
import {GameDetailScreensComponent} from './game-messages/pages/game-detail-screens/game-detail-screens.component';
import {GameDetailFlowchartComponent} from './game-messages/pages/game-detail-flowchart/game-detail-flowchart.component';

import {AuthGuard} from './auth/guards/auth.guard';
import {ScreenDetailComponent} from './game-message/pages/screen-detail/screen-detail.component';
import {RunResultsPageComponent} from "./game-runs-management/pages/run-results-page.component";
import {RunPlayersPageComponent} from "./game-runs-management/pages/run-players-page.component";
import {PendingPlayersOverviewComponent} from "./player-management/pages/pending-players-overview/pending-players-overview.component";
import {MediaLibraryAllFilesComponent} from "./game-messages/pages/media-library-all-files/media-library-all-files.component";
import {AccountInfoComponent} from "./auth/pages/account-info/account-info.component";
import {LoginScreenNoSocialComponent} from "./pages/login-screen/login-screen-no-social.component";
import {RunSettingsPageComponent} from "./game-runs-management/pages/run-settings-page.component";
import {environment} from "../environments/environment";
import {ManageUsersComponent} from "./portal-user-management/pages/manage-users.component";
import {ManageGameLibraryComponent} from "./portal-management/pages/manage-game-library.component";
import {ActionsOverviewComponent} from "./run-actions/pages/actions-overview.component";
import {ResponsesOverviewComponent} from "./run-responses/pages/responses-overview.component";
import {GameDisappearFlowchartComponent} from "./game-messages/pages/game.disappear.flowchart";
import {VideosTutorialComponent} from "./tutorial/pages/videos-tutorial.component";
import {VideoTutorialComponent} from './tutorial/pages/video-tutorial.component';
import {FaqTutorialComponent} from "./tutorial/pages/faq-tutorial.component";
import {ManageGameComponent} from './portal-management/pages/manage-game.component';
import {GameDetailSettingsComponent} from "./game-management/pages/game-detail-settings.component";
import {ManageUserComponent} from "./portal-user-management/pages/manage-user.component";
import {GameLibraryUserComponent} from "./user-library/pages/game-library-user.component";
import {GameLibararyUserViewgameComponent} from "./user-library/pages/game-libarary-user-viewgame.component";

export const APP_ROUTES: Routes = [
    {path: '', component: environment.socialLogin ? LoginScreenComponent : LoginScreenNoSocialComponent, pathMatch: 'full', data: {}},
    {path: 'friends/invitation/:id', component: AcceptInvitationComponent, pathMatch: 'full'},
    {path: 'google', component: LoginScreenComponent, pathMatch: 'full'},
    {path: 'login', component: environment.socialLogin ? LoginScreenComponent : LoginScreenNoSocialComponent, pathMatch: 'full'},
    {path: 'account', component: AccountInfoComponent, pathMatch: 'full'},
    {
        path: 'portal',
        canActivate: [AuthGuard],
        children: [
            {path: '', redirectTo: 'categories', pathMatch: 'full'},
            {path: 'admin/featured/overview', component: FeaturedGamesOverviewComponent, pathMatch: 'full'},
            {path: 'category/:id', redirectTo: '/categories/:id', pathMatch: 'full'},
            {
                path: 'tutorial', // this will become deprecated
                children: [
                    {path: '', redirectTo: 'overview', pathMatch: 'full'},
                    {path: 'video', component: VideosTutorialComponent, pathMatch: 'full'},
                    {path: 'video/:gameId', component: VideosTutorialComponent, pathMatch: 'full'},
                    {path: 'video/:gameId/:videoId', component: VideoTutorialComponent, pathMatch: 'full'},
                    {path: 'faq', component: FaqTutorialComponent, pathMatch: 'full'},
                    {path: 'faq/:gameId', component: FaqTutorialComponent, pathMatch: 'full'},
                    {path: '**', redirectTo: 'overview'},
                ],
            },
            {
                path: 'games', // this will become deprecated
                children: [
                    {path: '', redirectTo: 'overview', pathMatch: 'full'},
                    {path: 'list', component: GamesListComponent, pathMatch: 'full'},
                    {path: '**', redirectTo: 'overview'},
                ],
            },
            {
                path: 'root', // this will become deprecated
                children: [
                    {path: '', redirectTo: 'overview', pathMatch: 'full'},
                    {path: 'games', component: GamesListComponent, pathMatch: 'full'},
                    {path: 'connections', component: PlayerOverviewComponent, pathMatch: 'full'},
                    {path: 'pending', component: PendingPlayersOverviewComponent, pathMatch: 'full'},
                    {path: 'librarymgt', component: ManageGameLibraryComponent, pathMatch: 'full'},
                    {path: 'library', component: GameLibraryUserComponent, pathMatch: 'full'},
                    {path: 'library/game/:gameId', component: GameLibararyUserViewgameComponent, pathMatch: 'full'},
                    {path: 'usrmgt', component: ManageUsersComponent, pathMatch: 'full'},
                    {path: 'usrmgt/:userId', component: ManageUserComponent, pathMatch: 'full'},
                    {path: 'portal', component: ManageGameLibraryComponent, pathMatch: 'full'},
                    {path: 'portal/:gameId', component: ManageGameComponent, pathMatch: 'full'},
                    {path: '**', redirectTo: 'overview'},
                ],
            },
            {
                path: 'game/:gameId/detail',
                children: [
                    {path: 'screens', component: GameDetailScreensComponent, pathMatch: 'full'},
                    {path: 'flowchart/appear', component: GameDetailFlowchartComponent, pathMatch: 'full'},
                    {path: 'flowchart/disappear', component: GameDisappearFlowchartComponent, pathMatch: 'full'},
                    {path: 'settings', component: GameDetailSettingsComponent, pathMatch: 'full'},
                    {path: 'runs', component: RunOverviewComponent, pathMatch: 'full'},
                    {path: 'media', component: MediaLibraryAllFilesComponent, pathMatch: 'full'},
                    {path: 'list', component: GamesListComponent, pathMatch: 'full'},
                    {path: '**', redirectTo: 'overview'},
                ],
            },
            {
                path: 'game/:gameId/run/:runId',
                children: [
                    {path: 'players', component: RunPlayersPageComponent, pathMatch: 'full'},
                    {path: 'actions', component: ActionsOverviewComponent, pathMatch: 'full'},
                    {path: 'results/:messageId', component: ResponsesOverviewComponent, pathMatch: 'full'},
                    {path: 'settings', component: RunSettingsPageComponent, pathMatch: 'full'},
                    {path: '**', redirectTo: 'players'},
                ],
            },
            {
                path: ':gameId/message/:messageId',
                children: [
                    {path: '', redirectTo: 'detail', pathMatch: 'full'},
                    {path: 'detail', component: ScreenDetailComponent, pathMatch: 'full'},
                    {path: '**', redirectTo: 'press'},
                ],
            }
        ],
    },
    {path: '**', redirectTo: ''},
];
