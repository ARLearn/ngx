import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDetailScreensComponent } from './game-detail-screens.component';

describe('GameDetailScreensComponent', () => {
  let component: GameDetailScreensComponent;
  let fixture: ComponentFixture<GameDetailScreensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameDetailScreensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameDetailScreensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
