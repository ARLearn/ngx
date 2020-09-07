import {FeaturedGameState} from "./user-library.reducer";
import {PortalGame} from "../../portal-management/store/portal-games.state";


export interface UserLibraryState {
    featuredGames: FeaturedGameState;
    queryGames: PortalGame[];

}
