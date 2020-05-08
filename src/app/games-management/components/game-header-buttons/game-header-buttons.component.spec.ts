import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameHeaderButtonsComponent } from './game-header-buttons.component';

describe('GameHeaderButtonsComponent', () => {
  let component: GameHeaderButtonsComponent;
  let fixture: ComponentFixture<GameHeaderButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameHeaderButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameHeaderButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
