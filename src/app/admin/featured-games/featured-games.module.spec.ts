import { FeaturedGamesModule } from './featured-games.module';

describe('FeaturedGamesModule', () => {
  let featuredGamesModule: FeaturedGamesModule;

  beforeEach(() => {
    featuredGamesModule = new FeaturedGamesModule();
  });

  it('should create an instance', () => {
    expect(featuredGamesModule).toBeTruthy();
  });
});
