import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorTitleDescriptionComponent } from './editor-title-description.component';

describe('EditorTitleDescriptionComponent', () => {
  let component: EditorTitleDescriptionComponent;
  let fixture: ComponentFixture<EditorTitleDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorTitleDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorTitleDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
