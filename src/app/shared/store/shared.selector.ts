import {createFeatureSelector, createSelector,} from '@ngrx/store';

import {SharedState} from './shared.state';
import * as fromRoot from 'src/app/core/reducers';


export interface State extends fromRoot.State {
  shared: SharedState;
}

export const getCustomerFeature = createFeatureSelector<State, any>('shared');

const _getError = (state: SharedState) => state.lastError;

export const getLastError = createSelector(getCustomerFeature, _getError);
