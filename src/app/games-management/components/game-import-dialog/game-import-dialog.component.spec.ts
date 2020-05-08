import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameImportDialogComponent } from './game-import-dialog.component';

describe('GameImportDialogComponent', () => {
  let component: GameImportDialogComponent;
  let fixture: ComponentFixture<GameImportDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameImportDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameImportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
