import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameListTableComponent } from './game-list-table.component';

describe('GameListTableComponent', () => {
  let component: GameListTableComponent;
  let fixture: ComponentFixture<GameListTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameListTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
