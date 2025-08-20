import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Uploadcourses } from './uploadcourses';

describe('Uploadcourses', () => {
  let component: Uploadcourses;
  let fixture: ComponentFixture<Uploadcourses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Uploadcourses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Uploadcourses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
