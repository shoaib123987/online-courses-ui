import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDemo } from './course-demo';

describe('CourseDemo', () => {
  let component: CourseDemo;
  let fixture: ComponentFixture<CourseDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
