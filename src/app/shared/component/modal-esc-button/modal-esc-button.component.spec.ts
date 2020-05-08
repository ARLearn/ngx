import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEscButtonComponent } from './modal-esc-button.component';

describe('ModalEscButtonComponent', () => {
  let component: ModalEscButtonComponent;
  let fixture: ComponentFixture<ModalEscButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEscButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEscButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
