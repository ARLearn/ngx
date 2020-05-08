import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedGamesTableComponent } from './featured-games-table.component';

describe('FeaturedGamesTableComponent', () => {
  let component: FeaturedGamesTableComponent;
  let fixture: ComponentFixture<FeaturedGamesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedGamesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedGamesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
