import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickFileInputComponent } from './pick-file-input.component';

describe('PickFileInputComponent', () => {
  let component: PickFileInputComponent;
  let fixture: ComponentFixture<PickFileInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickFileInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickFileInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
