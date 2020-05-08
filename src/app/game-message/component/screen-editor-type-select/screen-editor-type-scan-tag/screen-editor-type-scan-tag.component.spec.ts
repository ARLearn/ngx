import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenEditorTypeScanTagComponent } from './screen-editor-type-scan-tag.component';

describe('ScreenEditorTypeScanTagComponent', () => {
  let component: ScreenEditorTypeScanTagComponent;
  let fixture: ComponentFixture<ScreenEditorTypeScanTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenEditorTypeScanTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenEditorTypeScanTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
