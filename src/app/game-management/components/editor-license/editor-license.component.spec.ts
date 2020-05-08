import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorLicenseComponent } from './editor-license.component';

describe('EditorLicenseComponent', () => {
  let component: EditorLicenseComponent;
  let fixture: ComponentFixture<EditorLicenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorLicenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
