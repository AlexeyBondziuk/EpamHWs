import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

  export class CustomValidators {

    static range (min: number, max: number): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const controlValue = Number(control.value)

        if (controlValue !== undefined && (isNaN(controlValue) || controlValue < min || controlValue > max)) {
          return {
            range: true,
            min,
            max
          }
        }
        return null
      }
    }

    static date (control: AbstractControl): ValidationErrors | null {
      const regexp = /^(0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])[\/]\d{2}$/

      if (!regexp.test(control.value)) {
        return {
          date: true
        }
      }

      return null
    }
}
