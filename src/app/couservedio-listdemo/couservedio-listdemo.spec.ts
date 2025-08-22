import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouservedioListdemo } from './couservedio-listdemo';

describe('CouservedioListdemo', () => {
  let component: CouservedioListdemo;
  let fixture: ComponentFixture<CouservedioListdemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouservedioListdemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouservedioListdemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
