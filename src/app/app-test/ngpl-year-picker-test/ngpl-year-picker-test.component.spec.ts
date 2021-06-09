import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgplYearPickerTestComponent } from './ngpl-year-picker-test.component';

describe('NgplSelectTestComponent', () => {
  let component: NgplYearPickerTestComponent;
  let fixture: ComponentFixture<NgplYearPickerTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgplYearPickerTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgplYearPickerTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
