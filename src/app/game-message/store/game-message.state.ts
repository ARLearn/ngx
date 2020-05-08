import {GameMessage} from '../../game-messages/store/game-messages.state';

export const gameMessageInitialState: GameMessageState = {
    editMessage: null,
    previewScreen: {ptype: 'mc', data: {}}
};

export interface GameMessageState {
    editMessage?: GameMessage;
    previewScreen: { ptype: string; data: any };
}



