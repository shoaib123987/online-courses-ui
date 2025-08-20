import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Uploadcdetails } from './uploadcdetails';

describe('Uploadcdetails', () => {
  let component: Uploadcdetails;
  let fixture: ComponentFixture<Uploadcdetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Uploadcdetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Uploadcdetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
