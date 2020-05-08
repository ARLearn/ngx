import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingPlayersOverviewComponent } from './pending-players-overview.component';

describe('PendingPlayersOverviewComponent', () => {
  let component: PendingPlayersOverviewComponent;
  let fixture: ComponentFixture<PendingPlayersOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingPlayersOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingPlayersOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
