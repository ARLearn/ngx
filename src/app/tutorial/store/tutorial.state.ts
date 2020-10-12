import {Game} from "../../game-management/store/current-game.state";
import {GameMessage} from "../../game-messages/store/types";

export interface TutorialState {
    faqGames: Game[];
    videoGames: Game[];
    messages: GameMessage[];

    selectedVideoCategory?: string;
}

export const initialTutorialState: TutorialState = {
    faqGames: [],
    videoGames: [],
    messages: [],

    selectedVideoCategory: 'all',
};
