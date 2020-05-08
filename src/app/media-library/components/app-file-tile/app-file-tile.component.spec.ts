import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFileTileComponent } from './app-file-tile.component';

describe('AppFileTileComponent', () => {
  let component: AppFileTileComponent;
  let fixture: ComponentFixture<AppFileTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppFileTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppFileTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
