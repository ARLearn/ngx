import {Component, NgModule, OnInit} from '@angular/core';
// import {SvgViewerModule} from '../../shared/svg-viewer/svg-viewer';
import { MatButtonModule } from '@angular/material/button';
// import {FooterModule} from '../../shared/footer/footer';
import {RouterModule} from '@angular/router';
import {ComponentPageTitle} from '../page-title/page-title';
import {TranslateModule} from '@ngx-translate/core';
import {Store} from '@ngrx/store';
import {AuthState} from '../../auth/state/auth.state';
import {environment} from 'src/environments/environment';

const homepage = './homepage.html';

@Component({
  selector: 'app-homepage',
  // templateUrl: 'homepage.nbd.html',
  templateUrl: environment.homepage,
  styleUrls: ['./homepage.scss']
})
export class Homepage implements OnInit {
  constructor(
    public _componentPageTitle: ComponentPageTitle,
    private store: Store<AuthState>
  ) {
  }

  test = environment.homepage;

  ngOnInit(): void {
    this._componentPageTitle.title = '';
  }

  //
  // demotest() {
  //
  //   console.log('about to download');
  //   this.store.dispatch(new DownloadGameRequestAction({}));
  //
  // }
  //
  // loadMessages() {
  //
  //   console.log('about to download');
  //
  //   this.store.dispatch(new GetGameMessagesRequestAction({gameId: 6131899618557952}));
  //
  // }
  //
  // downloadGame() {
  //   this.store.dispatch(new SetCurrentGameRequestAction({gameId: 6131899618557952}));
  // }

}

@NgModule({
  imports: [
    MatButtonModule,
    TranslateModule.forRoot(),
    RouterModule],
  exports: [Homepage],
  declarations: [Homepage],
})
export class HomepageModule {
}
