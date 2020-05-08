import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePatternsTileComponent } from './game-patterns-tile.component';

describe('GamePatternsTileComponent', () => {
  let component: GamePatternsTileComponent;
  let fixture: ComponentFixture<GamePatternsTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamePatternsTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamePatternsTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
