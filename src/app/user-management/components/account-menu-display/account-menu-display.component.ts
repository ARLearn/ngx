import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../core/reducers';
// import {getUserDisplayName, getUserEmail, getUserPicture} from '../../store/portal-user.selector';
import * as actions from 'src/app/auth/store/auth.actions';

@Component({
  selector: 'app-account-menu-display',
  templateUrl: './account-menu-display.component.html',
  styleUrls: ['./account-menu-display.component.css']
})
export class AccountMenuDisplayComponent implements OnInit {
  userEmail$ = "todo";//this.store.pipe(select(getUserEmail));
  displayName = "todo";//this.store.pipe(select(getUserDisplayName));
  picture = "todo";//this.store.pipe(select(getUserPicture));

  constructor(private store: Store<State>) {
  }

  signOut() {
    this.store.dispatch(
      new actions.LogoutRequestedAction()
    );
  }

  ngOnInit() {
  }

}
