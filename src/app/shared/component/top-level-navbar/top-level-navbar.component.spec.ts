import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopLevelNavbarComponent } from './top-level-navbar.component';

describe('GamesListNavbarComponent', () => {
  let component: TopLevelNavbarComponent;
  let fixture: ComponentFixture<TopLevelNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopLevelNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopLevelNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
