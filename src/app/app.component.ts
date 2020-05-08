import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import {Store} from '@ngrx/store';
import {State} from './core/reducers';
import {GetMessageDeleteRequestAction} from './game-messages/store/game-messages.actions';
import {ReLoginRequestedAction} from './auth/store/auth.actions';
import {AuthService} from './auth/services/auth.service';

@Component({
  selector: 'app-arlearn',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  constructor(private store: Store<State>,
              private authService: AuthService,
              ) {
  }

  ngOnInit() {
    this.authService.setPersistence();
    this.store.dispatch(new ReLoginRequestedAction ());
  }

}
