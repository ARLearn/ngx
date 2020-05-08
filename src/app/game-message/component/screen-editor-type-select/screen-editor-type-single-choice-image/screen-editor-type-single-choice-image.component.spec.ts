import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenEditorTypeSingleChoiceImageComponent } from './screen-editor-type-single-choice-image.component';

describe('ScreenEditorTypeSingleChoiceImageComponent', () => {
  let component: ScreenEditorTypeSingleChoiceImageComponent;
  let fixture: ComponentFixture<ScreenEditorTypeSingleChoiceImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenEditorTypeSingleChoiceImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenEditorTypeSingleChoiceImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
