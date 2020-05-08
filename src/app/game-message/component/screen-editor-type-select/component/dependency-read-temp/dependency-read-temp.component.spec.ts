import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependencyReadTempComponent } from './dependency-read-temp.component';

describe('DependencyReadTempComponent', () => {
  let component: DependencyReadTempComponent;
  let fixture: ComponentFixture<DependencyReadTempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependencyReadTempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependencyReadTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
