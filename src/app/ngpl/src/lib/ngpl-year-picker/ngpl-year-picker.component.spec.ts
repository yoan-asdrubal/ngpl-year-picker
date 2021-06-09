import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {NgplYearPickerComponent} from './ngpl-year-picker.component';

describe('WidgetPeriodPickerComponent', () => {
	let component: NgplYearPickerComponent;
	let fixture: ComponentFixture<NgplYearPickerComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
				declarations: [NgplYearPickerComponent]
			})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(NgplYearPickerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
