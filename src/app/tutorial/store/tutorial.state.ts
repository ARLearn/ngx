import {Game} from "../../game-management/store/current-game.state";


export interface TutorialState {
    faqGames: Game[];
}

export const initialTutorialState: TutorialState = {
    faqGames: []
};

