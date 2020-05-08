import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilePreviewSingleChoiceComponent } from './mobile-preview-single-choice.component';

describe('MobilePreviewSingleChoiceComponent', () => {
  let component: MobilePreviewSingleChoiceComponent;
  let fixture: ComponentFixture<MobilePreviewSingleChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobilePreviewSingleChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobilePreviewSingleChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
