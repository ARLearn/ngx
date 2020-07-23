import {Game} from "../../game-management/store/current-game.state";
import {GameMessage} from "../../game-messages/store/game-messages.state";


export interface TutorialState {
    faqGames: Game[];
    messages: GameMessage[];
}

export const initialTutorialState: TutorialState = {
    faqGames: [],
    messages: []
};

