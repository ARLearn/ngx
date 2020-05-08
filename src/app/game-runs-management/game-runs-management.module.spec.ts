import { GameRunsManagementModule } from './game-runs-management.module';

describe('GameRunsManagementModule', () => {
  let gameRunsManagementModule: GameRunsManagementModule;

  beforeEach(() => {
    gameRunsManagementModule = new GameRunsManagementModule();
  });

  it('should create an instance', () => {
    expect(gameRunsManagementModule).toBeTruthy();
  });
});
