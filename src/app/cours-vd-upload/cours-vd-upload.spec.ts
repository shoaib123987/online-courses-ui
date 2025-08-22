import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursVdUpload } from './cours-vd-upload';

describe('CoursVdUpload', () => {
  let component: CoursVdUpload;
  let fixture: ComponentFixture<CoursVdUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursVdUpload]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursVdUpload);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
