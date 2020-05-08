import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilePreviewMultipleScanComponent } from './mobile-preview-multiple-scan.component';

describe('MobilePreviewMultipleScanComponent', () => {
  let component: MobilePreviewMultipleScanComponent;
  let fixture: ComponentFixture<MobilePreviewMultipleScanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobilePreviewMultipleScanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobilePreviewMultipleScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
