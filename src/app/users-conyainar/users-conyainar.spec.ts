import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersConyainar } from './users-conyainar';

describe('UsersConyainar', () => {
  let component: UsersConyainar;
  let fixture: ComponentFixture<UsersConyainar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersConyainar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersConyainar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
