import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePatternsContainerComponent } from './game-patterns-container.component';

describe('GamePatternsContainerComponent', () => {
  let component: GamePatternsContainerComponent;
  let fixture: ComponentFixture<GamePatternsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamePatternsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamePatternsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
