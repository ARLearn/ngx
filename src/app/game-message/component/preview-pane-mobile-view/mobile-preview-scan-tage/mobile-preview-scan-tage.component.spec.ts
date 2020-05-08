import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilePreviewScanTageComponent } from './mobile-preview-scan-tage.component';

describe('MobilePreviewScanTageComponent', () => {
  let component: MobilePreviewScanTageComponent;
  let fixture: ComponentFixture<MobilePreviewScanTageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobilePreviewScanTageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobilePreviewScanTageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
