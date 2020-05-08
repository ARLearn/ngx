import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDropDownDisplayComponent } from './user-drop-down-display.component';

describe('UserDropDownDisplayComponent', () => {
  let component: UserDropDownDisplayComponent;
  let fixture: ComponentFixture<UserDropDownDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDropDownDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDropDownDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
