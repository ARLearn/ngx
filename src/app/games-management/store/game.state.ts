import {Game} from '../../game-management/store/current-game.state';

export interface GameState {
  loading: boolean;
  filter: string[];
  list: Game[];
}

export const gameInitialState: GameState = {
  loading: false,
  filter: [],
  list: []
};
