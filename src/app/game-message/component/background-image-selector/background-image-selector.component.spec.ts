import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundImageSelectorComponent } from './background-image-selector.component';

describe('BackgroundImageSelectorComponent', () => {
  let component: BackgroundImageSelectorComponent;
  let fixture: ComponentFixture<BackgroundImageSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackgroundImageSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroundImageSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
