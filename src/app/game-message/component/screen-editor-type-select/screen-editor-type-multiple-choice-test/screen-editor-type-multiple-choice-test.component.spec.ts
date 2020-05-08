import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenEditorTypeMultipleChoiceTestComponent } from './screen-editor-type-multiple-choice-test.component';

describe('ScreenEditorTypeMultipleChoiceTestComponent', () => {
  let component: ScreenEditorTypeMultipleChoiceTestComponent;
  let fixture: ComponentFixture<ScreenEditorTypeMultipleChoiceTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenEditorTypeMultipleChoiceTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenEditorTypeMultipleChoiceTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
