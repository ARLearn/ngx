import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenEditorTypeNarratorComponent } from './screen-editor-type-narrator.component';

describe('ScreenEditorTypeNarratorComponent', () => {
  let component: ScreenEditorTypeNarratorComponent;
  let fixture: ComponentFixture<ScreenEditorTypeNarratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenEditorTypeNarratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenEditorTypeNarratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
