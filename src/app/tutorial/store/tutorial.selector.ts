import {createFeatureSelector, createSelector, select} from '@ngrx/store';
import * as fromRootSelector from "../../core/selectors/router.selector";

import * as fromRoot from 'src/app/core/reducers';
import {TutorialState} from './tutorial.state';
import {environment} from "../../../environments/environment";


export interface State extends fromRoot.State {
    'tutorial-games': TutorialState;
}

export const getTutorialFeature = createFeatureSelector<State, TutorialState>('tutorial-games');
export const getFaqGames = createSelector(getTutorialFeature, (state) => state.faqGames);
export const getMessages = createSelector(getTutorialFeature, (state) => state.messages);


export const sortedMessages = createSelector(getMessages, (messages) => messages.sort((a, b) => {
        // if (a.sortKey < b.sortKey) {
        //     return -1;
        // }
        // if (a.sortKey > b.sortKey) {
        //     return 1;
        // }
        return 0;
    }
));

export const currentFaqGame = createSelector(fromRootSelector.selectRouteParam('gameId'), (id) => {
        if (!id) {
            return environment.tutorial.defaultFaq;
        }
        return id;
    }
);
