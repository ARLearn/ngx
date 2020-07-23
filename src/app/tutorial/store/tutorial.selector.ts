import {createFeatureSelector, createSelector, select} from '@ngrx/store';

import * as fromRoot from 'src/app/core/reducers';
import { TutorialState } from './tutorial.state';



export interface State extends fromRoot.State {
    'tutorial-games': TutorialState;
}
export const getTutorialFeature = createFeatureSelector<State, TutorialState>('tutorial-games');
export const getFaqGames = createSelector(getTutorialFeature, (state) => state.faqGames);
