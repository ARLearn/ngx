import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBackButtonComponent } from './header-back-button.component';

describe('HeaderBackButtonComponent', () => {
  let component: HeaderBackButtonComponent;
  let fixture: ComponentFixture<HeaderBackButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderBackButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderBackButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
