import {OnlyGameState} from "./portal-games.reducer";

export interface PortalGame {
    gameId: number;
    title: string;
    language: string;
    icon: string;

    description: string;
    lastModificationDate: number;
    category: string;

    private: boolean;
    rate: number;
    reviews: number;
    featured: boolean;
}

export interface PortalGamesState {
    queryGames: PortalGame[];
    portalGames: OnlyGameState;
    portalGame: PortalGame;
}


