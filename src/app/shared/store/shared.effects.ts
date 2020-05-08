import {Action, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';

import * as actions from './shared.actions';

import {State} from 'src/app/core/reducers';




@Injectable()
export class SharedEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<State>
  ) {

  }


}
