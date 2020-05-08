import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoverOverlayComponent } from './hover-overlay.component';

describe('HoverOverlayComponent', () => {
  let component: HoverOverlayComponent;
  let fixture: ComponentFixture<HoverOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoverOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoverOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
