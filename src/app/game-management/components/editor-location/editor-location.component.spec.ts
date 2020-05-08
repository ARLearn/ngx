import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorLocationComponent } from './editor-location.component';

describe('EditorLocationComponent', () => {
  let component: EditorLocationComponent;
  let fixture: ComponentFixture<EditorLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
