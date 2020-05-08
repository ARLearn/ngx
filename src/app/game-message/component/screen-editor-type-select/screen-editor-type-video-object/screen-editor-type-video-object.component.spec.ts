import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenEditorTypeVideoObjectComponent } from './screen-editor-type-video-object.component';

describe('ScreenEditorTypeVideoObjectComponent', () => {
  let component: ScreenEditorTypeVideoObjectComponent;
  let fixture: ComponentFixture<ScreenEditorTypeVideoObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenEditorTypeVideoObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenEditorTypeVideoObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
