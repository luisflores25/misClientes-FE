import { AbstractControl, ValidatorFn } from "@angular/forms";

export function dateRangeValidator(
	minDate: string,
	maxDate: string,
): ValidatorFn {
	return (control: AbstractControl): { [key: string]: any } | null => {
		const value = control.value;
		const min = new Date(minDate);
		const max = new Date(maxDate);
		const inputDate = new Date(value);

		if (inputDate < min || inputDate > max) {
			return { dateRange: true };
		}
		return null;
	};
}
