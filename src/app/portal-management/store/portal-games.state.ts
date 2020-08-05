import {CategoryState, OnlyGameState} from "./portal-games.reducer";

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

export interface Category {
    id: number;
    categoryId: number;
    title: string;
    lang: string;
}

export interface PortalGamesState {
    queryGames: PortalGame[];
    portalGames: OnlyGameState;
    categories: CategoryState;
    portalGame: PortalGame;
}


