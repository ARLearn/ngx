import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionTileComponent } from './connection-tile.component';

describe('ConnectionTileComponent', () => {
  let component: ConnectionTileComponent;
  let fixture: ComponentFixture<ConnectionTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectionTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
