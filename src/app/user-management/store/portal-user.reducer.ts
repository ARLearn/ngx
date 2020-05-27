import * as actions from './portal-user.actions';
import {portalUserInitialState, UserState} from './portal-user.state';


export function reducers(
  state = portalUserInitialState, action: actions.PortalUserAction): UserState {
  switch (action.type) {

    case actions.PortalUserActionTypes.LOAD_USER_COMPLETED: {
      return Object.assign({}, action.payload);
    }

    default: {
      return state;
    }
  }
}
