import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAxis } from './course-axis';

describe('CourseAxis', () => {
  let component: CourseAxis;
  let fixture: ComponentFixture<CourseAxis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseAxis]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseAxis);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
