import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {Moment} from 'moment';
import {Changes} from 'ngx-reactivetoolkit';
import {debounceTime, take, tap} from 'rxjs/operators';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {timer} from 'rxjs';
import {NGPL_FILTER_BASE, NgplFilterBase} from 'ngpl-filter';


const MONTH_MODE_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@UntilDestroy()
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngpl-year-picker',
  templateUrl: './ngpl-year-picker.component.html',
  styleUrls: ['./ngpl-year-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgplYearPickerComponent),
      multi: true
    },
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    {provide: MAT_DATE_FORMATS, useValue: MONTH_MODE_FORMATS},
    {
      provide: NGPL_FILTER_BASE, useExisting: forwardRef(() => NgplYearPickerComponent)
    }
  ]
})
export class NgplYearPickerComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor, NgplFilterBase  {

  yearCtrl = new FormControl();
  /**
   * Mat-Label que se mostrará en el mat-form-field del autocomplete
   */
  @Input() placeHolder = '';

  /**
   * Define el atributo appearance del matFormField, permite los mismos valores
   */
  @Input() appearance: 'legacy' | 'standard' | 'fill' | 'outline' | 'default' = 'outline';

  @Input() color = 'accent';

  @Input() customClass: '';

  _value: number;

  /** Maneja valor minimo a seleccionar por el periodo,
   *  puede ser un string ('2019#08'), objeto {anno:2019, mes:8} o una fecha
   */
  @Input() min: any;
  @Changes('min') min$;
  _min: Date;

  /** Maneja valor maximo a seleccionar por el periodo,
   *  puede ser un string ('2019#08'), objeto {anno:2019, mes:8} o una fecha
   */
  @Input() max: any;
  @Changes('max') max$;
  _max: Date;

  @Output() opened = new EventEmitter();
  @Output() closed = new EventEmitter();

  /**
   *  Define el comportamiento del floatLabel en el matFormField, acepta los mismos valores que el atributo floatLabel del matFormField
   */
  @Input() floatLabel = '';
  /**
   *  Define el comportamiento del floatLabel en el matFormField, acepta los mismos valores que el atributo floatLabel del matFormField
   */
  /**  Controla si el componenten debe mostrar un Skeleton */
  @Input() showLoading = false;

  @Input() showLoadingWidth = '100%';
  @Input() showLoadingHeight = '15px';
  /**
   *
   */
  /**
   * Define si el componente estara deshabilitado
   */
  disabledControl = false;

  @Input() readOnlyControl = false;

  @Input() allowUserInput = false;
  /**
   * Emite cuando cambia el valor seleccionado
   */
  @Output() valueChange = new EventEmitter();


  ngControl: NgControl;

  constructor( private injector: Injector,
               private changeDetectorRef: ChangeDetectorRef ) {
  }

  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl, null, 2);

    this.min$
      .pipe(
        untilDestroyed(this),
        tap((val: number) => {
          this._min = new Date(val, 1, 1);
        })
      )
      .subscribe();
    this.max$
      .pipe(
        untilDestroyed(this),
        tap((val: number) => {
          this._max = new Date(val, 11, 31);
        })
      )
      .subscribe();
  }


  dateInput(date: Moment, picker): void {
    picker.close();
    this.yearCtrl.setValue(date);
    const fecha = new Date(this.yearCtrl.value);
    this._value = fecha.getFullYear();
    this.onChange(this._value);
    this.onTouch(this._value);
  }

  ngOnDestroy(): void {
  }

  ngOnChanges(): void {
  }

  onChange: any = () => {
  };
  onTouch: any = () => {
  };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: Date | number | any): void {
    if (!!obj && !isNaN(obj)) {
      if (obj instanceof Date) {
        const newValue = obj.getFullYear();
        this._value = newValue;
        this.yearCtrl.setValue(obj);
        this.onChange(newValue);
        this.onTouch(newValue);
      } else {
        this._value = obj;
        this.yearCtrl.setValue(new Date(obj, 1, 1));
      }
    } else {
      const date = new Date();
      const newValue = date.getFullYear();
      this._value = newValue;
      this.yearCtrl.setValue(date);

      timer()
        .pipe(
          take(1),
          debounceTime(10),
          tap(() => {
            if (!!this.ngControl.control) {
              this.ngControl.control.setValue(newValue);
            }
            this.changeDetectorRef.markForCheck();
          })
        )
        .subscribe();
    }
  }

  open(): void {
    this.opened.emit(true);
  }

  close(): void {
    this.closed.emit(true);
  }

  public emit(): void {
    this.valueChange.emit(this._value);
    this.onChange(this._value);
    this.onTouch(this._value);
  }

  clearValue(): void {
    this.yearCtrl.setValue(null);
    this._value = null;
    this.emit();
  }

  newValue(value: any): void {
    this.writeValue(value);
  }

}
