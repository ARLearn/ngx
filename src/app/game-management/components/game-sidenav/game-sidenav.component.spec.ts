import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSidenavComponent } from './game-sidenav.component';

describe('GameSidenavComponent', () => {
  let component: GameSidenavComponent;
  let fixture: ComponentFixture<GameSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
