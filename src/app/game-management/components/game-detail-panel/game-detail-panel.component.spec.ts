import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDetailPanelComponent } from './game-detail-panel.component';

describe('GameDetailPanelComponent', () => {
  let component: GameDetailPanelComponent;
  let fixture: ComponentFixture<GameDetailPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameDetailPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameDetailPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
