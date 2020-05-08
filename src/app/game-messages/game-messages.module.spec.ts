import { GameMessagesModule } from './game-messages.module';

describe('GameMessagesModule', () => {
  let gameMessagesModule: GameMessagesModule;

  beforeEach(() => {
    gameMessagesModule = new GameMessagesModule();
  });

  it('should create an instance', () => {
    expect(gameMessagesModule).toBeTruthy();
  });
});
