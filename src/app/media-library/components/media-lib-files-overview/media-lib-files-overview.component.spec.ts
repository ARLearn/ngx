import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaLibFilesOverviewComponent } from './media-lib-files-overview.component';

describe('MediaLibFilesOverviewComponent', () => {
  let component: MediaLibFilesOverviewComponent;
  let fixture: ComponentFixture<MediaLibFilesOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaLibFilesOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaLibFilesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
