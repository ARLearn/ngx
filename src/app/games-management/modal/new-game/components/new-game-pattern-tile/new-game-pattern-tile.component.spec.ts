import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGamePatternTileComponent } from './new-game-pattern-tile.component';

describe('NewGamePatternTileComponent', () => {
  let component: NewGamePatternTileComponent;
  let fixture: ComponentFixture<NewGamePatternTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewGamePatternTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGamePatternTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
