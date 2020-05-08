import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickLocationOnMapComponent } from './pick-location-on-map.component';

describe('PickLocationOnMapComponent', () => {
  let component: PickLocationOnMapComponent;
  let fixture: ComponentFixture<PickLocationOnMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickLocationOnMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickLocationOnMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
