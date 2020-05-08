import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewNavbarComponent } from './preview-navbar.component';

describe('PreviewNavbarComponent', () => {
  let component: PreviewNavbarComponent;
  let fixture: ComponentFixture<PreviewNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
