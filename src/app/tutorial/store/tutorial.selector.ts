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
export const currentVideoGame = createSelector(getTutorialFeature, (state) => state.selectedVideoCategory);

export const sortedMessages = createSelector(getMessages, currentVideoGame, (messages, gameId) => messages == null ? [] : messages
    .filter(x => gameId == 'all' || x.gameId.toString() === gameId)
    .sort((a, b) => {
        return Number(b.lastModificationDate) - Number(a.lastModificationDate);
    }
));

export const prevVideo = createSelector(sortedMessages, fromRootSelector.selectRouteParam('gameId'), fromRootSelector.selectRouteParam('videoId'),
    (messages, gameId, videoId) => {
        const idx = messages.findIndex(x => x.gameId.toString() === gameId && x.id.toString() === videoId);

        return messages[idx - 1];
    });

export const nextVideo = createSelector(sortedMessages, fromRootSelector.selectRouteParam('gameId'), fromRootSelector.selectRouteParam('videoId'),
    (messages, gameId, videoId) => {
    const idx = messages.findIndex(x => x.gameId.toString() === gameId && x.id.toString() === videoId);

    return messages[idx + 1];
});

export const currentFaqGame = createSelector(fromRootSelector.selectRouteParam('gameId'), (id) => {
        if (!id) {
            return environment.tutorial.defaultFaq;
        }
        return id;
    }
);



export const selectedVideoGame = createSelector(
    getVideoGames,
    currentVideoGame,
    (games, gameId) => {
        return games.find(x => x.gameId.toString() === gameId)
    }
)

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

export const orderedFAQVideos = createSelector(getVideoGames, videos => {
    return environment.tutorial.videoTopics.map(x => videos.find(f => f.gameId == x)).filter(x => !!x);
})
