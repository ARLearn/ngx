import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaLibContainerComponent } from './media-lib-container.component';

describe('MediaLibContainerComponent', () => {
  let component: MediaLibContainerComponent;
  let fixture: ComponentFixture<MediaLibContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaLibContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaLibContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
