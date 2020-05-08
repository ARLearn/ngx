// import * as fromRoot from '../../core/reducers';
import * as actions from './shared.actions';
import {sharedInitialState, SharedState} from './shared.state';


export function reducers(
  state = sharedInitialState, action: actions.SharedAction): SharedState {
  switch (action.type) {

    case actions.SharedActionTypes.SET_ERROR: {
      console.log("payload error", action.payload);
      let error = JSON.stringify(action.payload);
      if (action.payload.error && action.payload.error.message) {
        error = action.payload.error.message;
      }
      return Object.assign({}, state, {
        lastError: error
      });
    }

    default: {
      return state;
    }
  }
}
