import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function wholeNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value === null || value === '') return null;
    
    return Number.isInteger(+value) ? null : { wholeNumber: true };
  };
}