import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilePreviewVideoComponent } from './mobile-preview-video.component';

describe('MobilePreviewVideoComponent', () => {
  let component: MobilePreviewVideoComponent;
  let fixture: ComponentFixture<MobilePreviewVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobilePreviewVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobilePreviewVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
