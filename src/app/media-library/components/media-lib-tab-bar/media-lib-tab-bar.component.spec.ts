import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaLibTabBarComponent } from './media-lib-tab-bar.component';

describe('MediaLibTabBarComponent', () => {
  let component: MediaLibTabBarComponent;
  let fixture: ComponentFixture<MediaLibTabBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaLibTabBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaLibTabBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
