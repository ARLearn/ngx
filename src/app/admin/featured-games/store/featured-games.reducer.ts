import * as actions from './featured-games.actions';
import {featuredGamesInitialState, FeaturedGameState} from './featured-games.state';


export function reducers(
  state = featuredGamesInitialState, action: actions.GameAction): FeaturedGameState {
  switch (action.type) {


    case actions.GameActionTypes.GET_FEATURED_GAME_LIST_REQUESTED: {
      if (action.payload == null) return state;
      return Object.assign({}, state, {
        list: []
      });
    }

    case actions.GameActionTypes.GET_FEATURED_GAME_LIST_COMPLETED: {
      if (action.payload == null) return state;
      return Object.assign({}, state, {
        list: action.payload.games
      });
    }

    default: {
      return state;
    }
  }
}
