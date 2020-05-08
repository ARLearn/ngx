import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMessageTileComponent } from './new-message-tile.component';

describe('NewMessageTileComponent', () => {
  let component: NewMessageTileComponent;
  let fixture: ComponentFixture<NewMessageTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMessageTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMessageTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
