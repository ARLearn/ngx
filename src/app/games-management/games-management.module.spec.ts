import { GamesManagementModule } from './games-management.module';

describe('GamesManagementModule', () => {
  let gamesManagementModule: GamesManagementModule;

  beforeEach(() => {
    gamesManagementModule = new GamesManagementModule();
  });

  it('should create an instance', () => {
    expect(gamesManagementModule).toBeTruthy();
  });
});
