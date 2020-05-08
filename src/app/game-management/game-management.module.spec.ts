import { GameManagementModule } from './game-management.module';

describe('GameManagementModule', () => {
  let gameManagementModule: GameManagementModule;

  beforeEach(() => {
    gameManagementModule = new GameManagementModule();
  });

  it('should create an instance', () => {
    expect(gameManagementModule).toBeTruthy();
  });
});
