import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../core/reducers';
import { SetInvitationIdRequestAction} from '../../store/player.actions';
import {invitationBy, invitationExpired} from '../../store/player.selector';

@Component({
  selector: 'app-accept-invitation',
  templateUrl: './accept-invitation.component.html',
  styleUrls: ['./accept-invitation.component.css']
})
export class AcceptInvitationComponent implements OnInit {

  invitationExpired$ = this.store.pipe(select(invitationExpired));
  contactName$ = this.store.pipe(select(invitationBy));
  constructor(
    private store: Store<State>
  ) {
  }


  ngOnInit() {
    this.store.dispatch(new SetInvitationIdRequestAction());
  }



}
