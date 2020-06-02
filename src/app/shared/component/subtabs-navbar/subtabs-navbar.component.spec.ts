import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtabsNavbarComponent } from './subtabs-navbar.component';

describe('GamesListNavbarComponent', () => {
  let component: SubtabsNavbarComponent;
  let fixture: ComponentFixture<SubtabsNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtabsNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtabsNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
