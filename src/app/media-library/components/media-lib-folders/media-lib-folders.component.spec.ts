import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaLibFoldersComponent } from './media-lib-folders.component';

describe('MediaLibFoldersComponent', () => {
  let component: MediaLibFoldersComponent;
  let fixture: ComponentFixture<MediaLibFoldersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaLibFoldersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaLibFoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
