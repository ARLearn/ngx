import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMessageEntryScreenComponent } from './new-message-entry-screen.component';

describe('NewMessageEntryScreenComponent', () => {
  let component: NewMessageEntryScreenComponent;
  let fixture: ComponentFixture<NewMessageEntryScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMessageEntryScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMessageEntryScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
