import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGameWithTitleComponent } from './create-game-with-title.component';

describe('CreateGameWithTitleComponent', () => {
  let component: CreateGameWithTitleComponent;
  let fixture: ComponentFixture<CreateGameWithTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateGameWithTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGameWithTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
