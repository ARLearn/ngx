
export interface PortalGame {
    id: number;
    icon: string,
    title: string,
    description: string,
    date: string,
    category: string,
    country: string,
    private: boolean,
    rate: number,
    reviews: number,
    featured: boolean,
}

export interface PortalGamesState {
    portalGames: PortalGame[],
    portalGame: PortalGame,
}

export const portalGamesInitialState: PortalGamesState = {
    portalGames: [],
    portalGame: null,
};
