import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameAddDialogComponent } from './game-add-dialog.component';

describe('GameAddDialogComponent', () => {
  let component: GameAddDialogComponent;
  let fixture: ComponentFixture<GameAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameAddDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
