import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryFooterComponent } from './library-footer.component';

describe('LibraryFooterComponent', () => {
  let component: LibraryFooterComponent;
  let fixture: ComponentFixture<LibraryFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibraryFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
