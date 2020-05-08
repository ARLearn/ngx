import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilePreviewAnswerFeedbackComponent } from './mobile-preview-answer-feedback.component';

describe('MobilePreviewAnswerFeedbackComponent', () => {
  let component: MobilePreviewAnswerFeedbackComponent;
  let fixture: ComponentFixture<MobilePreviewAnswerFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobilePreviewAnswerFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobilePreviewAnswerFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
