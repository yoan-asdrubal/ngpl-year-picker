import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {currentTimeStringFormatted} from 'ngpl-common';

@Component({
  selector: 'ngpl-time-picker-test',
  templateUrl: './ngpl-year-picker-test.component.html',
  styleUrls: ['./ngpl-year-picker-test.component.scss']
})
export class NgplYearPickerTestComponent implements OnInit {

  formGroup: FormGroup;
  disableControl = new FormControl();
  readOnlyControl = new FormControl();
  loadingControl = new FormControl();


  constructor(private _formB: FormBuilder) {
  }

  ngOnInit(): void {
    this.formGroup = this._formB.group({
      yearpicker: [1995],
      yearpicker1: [currentTimeStringFormatted()],
      yearpicker2: [2080],
      yearpicker3: [2020],
      yearpicker4: [2022],
      yearpicker5: [null]

    });


  }


}
