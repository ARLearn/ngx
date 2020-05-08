import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorAuthorsComponent } from './editor-authors.component';

describe('EditorAuthorsComponent', () => {
  let component: EditorAuthorsComponent;
  let fixture: ComponentFixture<EditorAuthorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorAuthorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorAuthorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
