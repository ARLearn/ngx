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
export const getVideoGames = createSelector(getTutorialFeature, (state) => state.videoGames);
export const getMessages = createSelector(getTutorialFeature, (state) => state.messages);


export const sortedMessages = createSelector(getMessages, (messages) => messages == null ? [] : messages.sort((a, b) => {
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

export const currentVideoGame = createSelector(fromRootSelector.selectRouteParam('gameId'), (id) => {
        if (!id) {
            return 'all';
        }
        return id;
    }
);

export const currentVideoMessage = createSelector(
    getMessages,
    fromRootSelector.selectRouteParam('gameId'),
    fromRootSelector.selectRouteParam('videoId'), (messages, gameId, videoId) => {
        if (messages.length === 0) {
            return null;
        }
        return messages.filter(message => ((Number.parseInt(message.gameId + '', 10) === Number.parseInt(gameId, 10))
            && (message.id === Number.parseInt(videoId, 10))))[0];
    }
);
