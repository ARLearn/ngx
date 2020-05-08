export interface FeaturedGameState {
  list: FeaturedGame[];
}

export const featuredGamesInitialState: FeaturedGameState = {
  list: [{
    title: 'test'
  }]
};

export interface FeaturedGame {
  title: string;
}

//{
//       type: 'org.celstec.arlearn2.beans.game.Game',
//       gameId: '5641906755207168',
//       deleted: false,
//       lastModificationDate: '1561458034560',
//       title: 't7',
//       description: 'test',
//       config: {
//         type: 'org.celstec.arlearn2.beans.game.Config',
//         mapAvailable: false,
//         enableMyLocation: false,
//         enableExchangeResponses: true,
//         minZoomLevel: 1,
//         maxZoomLevel: 20
//       },
//       sharing: 1,
//       language: 'en',
//       theme: 1
//     },
//     {
//       type: 'org.celstec.arlearn2.beans.game.Game',
//       gameId: '5634472569470976',
//       deleted: false,
//       lastModificationDate: '1561385199916',
//       title: 't4',
//       config: {
//         type: 'org.celstec.arlearn2.beans.game.Config',
//         mapAvailable: false,
//         enableMyLocation: false,
//         enableExchangeResponses: true,
//         minZoomLevel: 1,
//         maxZoomLevel: 20
//       },
//       sharing: 1,
//       language: 'en',
//       theme: 1
//     },
//     {
//       type: 'org.celstec.arlearn2.beans.game.Game',
//       gameId: '5639445604728832',
//       deleted: false,
//       lastModificationDate: '1561385146325',
//       title: 't3',
//       config: {
//         type: 'org.celstec.arlearn2.beans.game.Config',
//         mapAvailable: false,
//         enableMyLocation: false,
//         enableExchangeResponses: true,
//         minZoomLevel: 1,
//         maxZoomLevel: 20
//       },
//       sharing: 1,
//       language: 'en',
//       theme: 1
//     }
