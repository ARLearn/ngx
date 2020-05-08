import { PlayerManagementModule } from './player-management.module';

describe('PlayerManagementModule', () => {
  let playerManagementModule: PlayerManagementModule;

  beforeEach(() => {
    playerManagementModule = new PlayerManagementModule();
  });

  it('should create an instance', () => {
    expect(playerManagementModule).toBeTruthy();
  });
});
