import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedGamesOverviewComponent } from './featured-games-overview.component';

describe('FeaturedGamesOverviewComponent', () => {
  let component: FeaturedGamesOverviewComponent;
  let fixture: ComponentFixture<FeaturedGamesOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedGamesOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedGamesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
