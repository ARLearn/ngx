import {createFeatureSelector, createSelector, select,} from '@ngrx/store';

import * as fromRoot from 'src/app/core/reducers';
import {ActionDependency, DependencyTypeAction, GameMessage, GameMessagesState} from './game-messages.state';
import {pipe} from 'rxjs/internal-compatibility';
import {messagesAdapter} from "./game-messages.reducer";
import {Dictionary} from "@ngrx/entity";


export interface State extends fromRoot.State {
    gameMessages: GameMessagesState;
}

export const getGameMessagesFeature = createFeatureSelector<State, any>('gameMessages');
export const getMessagesSelector = createSelector(getGameMessagesFeature, (state: GameMessagesState) => state.messages);

const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = messagesAdapter.getSelectors(getMessagesSelector);

const _currentMessageProjector = (state: GameMessagesState) => state.selectedMessage;
const _targetMessageProjector = (state: GameMessagesState) => state.targetMessage;
const _editModeProjector = (state: GameMessagesState) => state.editMode;
const _filtersProjector = (state: GameMessagesState) => state.filter;
const _previewProjector = (state: GameMessagesState) => state.preview;
const _currentGameId = (state: GameMessagesState) => state.gameId;

// const _idToMessageProjector = (id: number, messages: GameMessage[]) => messages.filter(m => m.id === id)[0];
const _idToMessageProjector = (id: number, messages: Dictionary<GameMessage>) => messages[id];


export const getCurrentMessageIdSelector = createSelector(getGameMessagesFeature, _currentMessageProjector);

export const getEditModeSelector = createSelector(getGameMessagesFeature, _editModeProjector);
export const getPreviewSelector = createSelector(getGameMessagesFeature, _previewProjector);
export const getCurrentGame = createSelector(getGameMessagesFeature, _currentGameId);
export const getFiltersSelector = createSelector(getGameMessagesFeature, _filtersProjector);

//export const getCurrentMessageSelector = createSelector(getCurrentMessageIdSelector, getMessagesSelector, _idToMessageProjector);
export const getCurrentMessageSelector = createSelector(getCurrentMessageIdSelector, selectEntities, _idToMessageProjector);

export const getTargetMessageIdSelector = createSelector(getGameMessagesFeature, _targetMessageProjector);
export const getCurrentGameMessages = createSelector(selectAll, getCurrentGame,
    (allMessages, currentGameId) => allMessages.filter(m => m.gameId === currentGameId));


export const getNodesSelector = createSelector(getGameMessagesFeature, (state) => state.messages.map(item => {
    return {
        id: item.id,
        label: item.name
    };
}));

export const getSelectedScreen = createSelector(getGameMessagesFeature, state => state.selectedScreen);
export const getMessagesLoading = createSelector(getGameMessagesFeature, state => state.loading);

// export const getDependenciesSelector = createSelector(getMessagesSelector, (messages) => messages.map(item => {
//     if (item.dependsOn.type === "org.celstec.arlearn2.beans.dependencies.ActionDependency") {
//         const dependency: ActionDependency = <ActionDependency>item.dependsOn;
//         if (dependency && dependency.generalItemId) {
//             return {
//                 id: 'dep_' + item.id,
//                 target: dependency.generalItemId,
//                 source: item.id,
//                 label: 'action: ' + dependency.action
//             };
//         }
//     }
//
//     return {
//         id: 'delete',
//     };
// }).filter(item => item.id !== 'delete'));

function getAllDependenciesByCondition(dependency, cb, result = []) {
    if (cb(dependency)) {
        result.push(dependency);
    }

    if (Array.isArray(dependency.dependencies) && dependency.dependencies.length > 0) {
        dependency.dependencies.forEach(x => {
            getAllDependenciesByCondition(x, cb, result);
        });
    }

    if (dependency.offset) {
        getAllDependenciesByCondition(dependency.offset, cb, result);
    }
    return result;
}

export const getQrCodesSelector = createSelector(getGameMessagesFeature, getCurrentGameMessages, (state, messages) => {
    const deps = [];
    if (!state.previewMessage) {
        return deps;
    }

    messages.forEach(x =>
        x.dependsOn &&
        getAllDependenciesByCondition(
            x.dependsOn,
            dependency => dependency.action && dependency.generalItemId.toString() === state.previewMessage.toString(),
            deps
        )
    );

    return deps;
});

//
// export const getFilteredMessagesSelector = createSelector(getMessagesSelector, getFiltersSelector,
//     (messages: GameMessage[], filters: string[]) => {
//         return messages.filter(message => {
//             if (!filters) {
//                 return true;
//             }
//             for (let i = 0; i < filters.length; i++) {
//                 if ((message.name.toUpperCase().indexOf(filters[0].toUpperCase()) === -1)
//                     &&
//                     ((message.label || '').indexOf(filters[0]) === -1)) {
//                     return false;
//                 }
//             }
//             return true;
//
//         });
//     });

export const getFilteredMessagesSelector = createSelector(getCurrentGameMessages, getFiltersSelector,
    (messages: GameMessage[], filters: string[]) => {
        return messages.filter(message => {
            if (!filters) {
                return true;
            }
            for (let i = 0; i < filters.length; i++) {
                if ((message.name.toUpperCase().indexOf(filters[0].toUpperCase()) === -1)
                    &&
                    ((message.label || '').indexOf(filters[0]) === -1)) {
                    return false;
                }
            }
            return true;

        });
    });


export const getMultipleMessagesSelector = createSelector(getCurrentGameMessages,
    (messages: GameMessage[]) => {
        return messages.filter(message => {
            const entry = message.type.toLowerCase();

            return entry.includes('single') || entry.includes('multiple') || entry.includes('question');
        });
    });


export const messagesPipe = pipe(
    select(getMessagesSelector)
);
export const nodesPipe = pipe(
    select(getNodesSelector)
);

// export const dependencies = pipe(
//     select(getDependenciesSelector)
// );

export const currentMessageIdPipe = pipe(
    select(getCurrentMessageIdSelector)
);

export const currentMessagePipe = pipe(
    select(getCurrentMessageSelector)
);
export const targetMessageIdPipe = pipe(
    select(getTargetMessageIdSelector)
);

export const getEditModePipe = pipe(
    select(getEditModeSelector)
);
