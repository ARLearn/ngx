import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMessageCreateComponent } from './new-message-create.component';

describe('NewMessageCreateComponent', () => {
  let component: NewMessageCreateComponent;
  let fixture: ComponentFixture<NewMessageCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMessageCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMessageCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
