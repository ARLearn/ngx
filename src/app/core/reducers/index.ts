import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer
} from "@ngrx/store";

import { routerReducer } from "@ngrx/router-store";
import * as fromRouter from "@ngrx/router-store";
import * as fromPortalUser from "./portaluser.reducer";
// import { PortalUserState } from "../state/portaluser.state";

export interface State {
  router: fromRouter.RouterReducerState;
  // portalUser: PortalUserState;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  // portalUser: fromPortalUser.reducers,
};


export const selectRouter = createFeatureSelector<
    State,
    fromRouter.RouterReducerState<any>
    >('router');
