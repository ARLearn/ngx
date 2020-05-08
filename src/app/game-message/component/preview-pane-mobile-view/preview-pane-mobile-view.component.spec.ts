import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewPaneMobileViewComponent } from './preview-pane-mobile-view.component';

describe('PreviewPaneMobileViewComponent', () => {
  let component: PreviewPaneMobileViewComponent;
  let fixture: ComponentFixture<PreviewPaneMobileViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewPaneMobileViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewPaneMobileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
