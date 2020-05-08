import { Component, OnInit } from '@angular/core';
// import {MatProgressButtonOptions} from 'mat-progress-buttons';
import {Store} from '@ngrx/store';
import {State} from '../../../core/reducers';
import {SaveUserRequestAction} from '../../store/portal-user.actions';

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.css']
})
export class UserConfigComponent implements OnInit {

  displayName: string;


  // btnOpts: MatProgressButtonOptions = {
  //   active: false,
  //   text: 'Save',
  //   buttonColor: 'primary',
  //   barColor: 'accent',
  //   raised: true,
  //   stroked: false,
  //   flat: false,
  //   mode: 'indeterminate',
  //   value: 0,
  //   disabled: false
  // };

  constructor(
    private store: Store<State>
  ) {
  }

  ngOnInit() {
  }



  saveMethod() {
    this.store.dispatch(new SaveUserRequestAction({
      name: this.displayName,
    }));
  }
}
