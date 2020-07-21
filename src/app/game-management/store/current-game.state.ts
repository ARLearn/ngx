import {GameTheme} from "../../game-themes/store/game-theme.state";

export interface CurrentGameState {
    loading: boolean;
    saving: boolean;
    error?: string;
    game?: Game;
    me?: string;
    authors?: GameAuthors[];
    selectedTheme?: GameTheme;
}

export const currentGameInitialState: CurrentGameState = {
    saving: false,
    loading: false,
    game: null,
    authors: [],
    selectedTheme: null,
};

export interface GameAuthors {
    timestamp: number;
    account: string;
    accessRights: number;
    gameId: number;
}

export interface Game {
    gameId?: number;
    title: string;
    description: string;
    lat?: number;
    lng?: number;
    theme?: number;
    sharing?: number;
    lastModificationDate?: number;
    language?: string;
    licenseCode?: string;
    config?: GameConfig;
    splashScreen?: string;

}

export interface GameConfig {
    mapAvailable?: boolean;
    enableExchangeResponses?: boolean;
    enableMyLocation?: boolean;
    mapType?: number;
    minZoomLevel?: number;
    maxZoomLevel?: number;
    primaryColor?: string;
    secondaryColor?: string;
}
