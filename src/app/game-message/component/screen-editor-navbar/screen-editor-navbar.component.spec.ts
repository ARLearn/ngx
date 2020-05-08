import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenEditorNavbarComponent } from './screen-editor-navbar.component';

describe('ScreenEditorNavbarComponent', () => {
  let component: ScreenEditorNavbarComponent;
  let fixture: ComponentFixture<ScreenEditorNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenEditorNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenEditorNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
