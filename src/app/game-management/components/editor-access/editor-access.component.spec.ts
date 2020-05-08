import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorAccessComponent } from './editor-access.component';

describe('EditorAccessComponent', () => {
  let component: EditorAccessComponent;
  let fixture: ComponentFixture<EditorAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
