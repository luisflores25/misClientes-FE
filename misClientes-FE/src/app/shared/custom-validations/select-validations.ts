import { AbstractControl, ValidatorFn } from "@angular/forms";

export function invalidValueOptionValidator(invalidValue: string | number): ValidatorFn {
	return (control: AbstractControl): { [key: string]: any } | null => {
		const selectedValue = control.value;
		if (selectedValue === invalidValue) {
			return { invalidValueOption: { value: selectedValue } };
		}
		return null;
	};
}