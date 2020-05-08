import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDetailNavbarComponent } from './game-detail-navbar.component';

describe('GameDetailNavbarComponent', () => {
  let component: GameDetailNavbarComponent;
  let fixture: ComponentFixture<GameDetailNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameDetailNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameDetailNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
