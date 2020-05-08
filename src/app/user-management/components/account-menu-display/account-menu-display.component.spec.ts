import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountMenuDisplayComponent } from './account-menu-display.component';

describe('AccountMenuDisplayComponent', () => {
  let component: AccountMenuDisplayComponent;
  let fixture: ComponentFixture<AccountMenuDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountMenuDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountMenuDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
