import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGameEntryScreenComponent } from './new-game-entry-screen.component';

describe('NewGameEntryScreenComponent', () => {
  let component: NewGameEntryScreenComponent;
  let fixture: ComponentFixture<NewGameEntryScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewGameEntryScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGameEntryScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
