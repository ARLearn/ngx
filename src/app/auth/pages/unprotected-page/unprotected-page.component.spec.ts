import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnprotectedPageComponent } from './unprotected-page.component';

describe('UnprotectedPageComponent', () => {
  let component: UnprotectedPageComponent;
  let fixture: ComponentFixture<UnprotectedPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnprotectedPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnprotectedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
