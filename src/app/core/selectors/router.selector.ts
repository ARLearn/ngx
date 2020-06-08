import {createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromRouter from '@ngrx/router-store';
import {selectRouter} from '../reducers/index';

export interface State {
  router: fromRouter.RouterReducerState;
}

export const getRouter = createFeatureSelector<fromRouter.RouterReducerState>('router');
export const getRouterState = (state: State) => state.router;

export const getCurrentUrl = createSelector(
  getRouterState,
  (state: fromRouter.RouterReducerState) => state.state.url
);


export const currentGameId = createSelector(
  getRouter,
  router => {
    // console.log(router.state)
    if (router == null
      || router.state.root.firstChild.firstChild == null
    ) {
      if (router != null && router.state.root.firstChild.params.gameId) {
        return router.state.root.firstChild.params.gameId;
      }
      return null;
    }


    return router.state.root.firstChild.firstChild.params.gameId;
  }
);

export const currentRunId = createSelector(
    getRouter,
    router => {
        if (router == null
            || router.state.root.firstChild.firstChild == null
        ) {
            if (router != null && router.state.root.firstChild.params.gameId) {
                return router.state.root.firstChild.params.gameId;
            }
            return null;
        }


        return router.state.root.firstChild.firstChild.params.runId;
    }
);

export const currentMessageId = createSelector(
  getRouter,
  router => {
    // console.log("retrieving messageId");
    if (router == null
      || router.state.root.firstChild.firstChild == null
    ) {
      if (router != null && router.state.root.firstChild.params.messageId) {
        return Number.parseInt(router.state.root.firstChild.params.messageId, 10);
      }
      return null;
    }


    return Number.parseInt(router.state.root.firstChild.firstChild.params.messageId,10);
  }
);


export const invitationId = createSelector(
  getRouter,
  router => {
    // console.log(router.state)
    if (router == null
      || router.state.root.firstChild == null
    ) {

      return null;
    }

    return router.state.root.firstChild.params.id;
  }
);


// export const currentBinId = createSelector(
//   getRouter,
//   router => {
//     if (router == null
//       || router.state.root.firstChild.firstChild == null
//       ) {
//
//       return null;
//     }
//     return router.state.root.firstChild.firstChild.params.solarBinId}
// );
//
// export const currentDistributor = createSelector(
//   getRouter,
//   router => {
//     if (router == null
//       || router.state.root.firstChild.firstChild == null
//       ) {
//
//       return null;
//     }
//     return router.state.root.firstChild.firstChild.params.distributorId}
// );
//
// export const currentCustomer = createSelector(
//   getRouter,
//   router => {
//     if (router == null
//       || router.state.root.firstChild.firstChild == null
//       ) {
//
//       return null;
//     }
//     return router.state.root.firstChild.firstChild.params.customerId}
// );


export const {
    selectCurrentRoute,   // select the current route
    selectQueryParams,    // select the current route query params
    selectQueryParam,     // factory function to select a query param
    selectRouteParams,    // select the current route params
    selectRouteParam,     // factory function to select a route param
    selectRouteData,      // select the current route data
    selectUrl,            // select the current url
} = fromRouter.getSelectors(selectRouter);
