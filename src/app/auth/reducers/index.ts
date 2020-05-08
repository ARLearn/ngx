import * as actions from '../store/auth.actions';
import {authInitialState, AuthState} from '../state/auth.state';


export function reducers(
  state = authInitialState, action: actions.AuthAction): AuthState {
  switch (action.type) {


    case actions.AuthActionTypes.LOGIN_COMPLETED: {
      // console.log ("login completed");
      return Object.assign({}, state, {
        user: action.payload.user,
        isLoggedIn: action.payload.user != null,
        isAdmin: action.payload.isAdmin,
        isDistributor: action.payload.isDistributor,
        error: null
      });
    }

    case actions.AuthActionTypes.AUTH_ERROR: {
      return Object.assign({}, state, {
        error: action.payload.error
      });
    }

    case actions.AuthActionTypes.LOGOUT_COMPLETED: {
      return Object.assign({}, state, {
        userData: null,
        isAdmin: false,
        isDistributor: false,
        isLoggedIn: false
      });
    }

    default: {
      return state;
    }
  }
}
