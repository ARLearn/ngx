import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenEditorTypeMultipleChoiceImageComponent } from './screen-editor-type-multiple-choice-image.component';

describe('ScreenEditorTypeMultipleChoiceImageComponent', () => {
  let component: ScreenEditorTypeMultipleChoiceImageComponent;
  let fixture: ComponentFixture<ScreenEditorTypeMultipleChoiceImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenEditorTypeMultipleChoiceImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenEditorTypeMultipleChoiceImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
