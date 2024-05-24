import { RequiredProgramFields } from "src/app/types/custom-types";

export class ChangeProgram {
	program_code!: string;

	// Values 1-8, will be validated in the service, in case it changes
	// and it depends based on client or program
	no_of_household?: number | null;

	bqp_first_name?: string | null;

	bqp_last_name?: string | null;

	bqp_ssn?: string | null;

	bqp_dob?: string | null;
	// Values 1-4, will be validated in the service, in case it changes
	// and it depends based on client or program
	public_housing_code?: number | null;

	constructor(
		program_code: string,
		no_of_household?: number | null,
		bqp_first_name?: string | null,
		bqp_last_name?: string | null,
		bqp_ssn?: string | null,
		bqp_dob?: string | null,
		public_housing_code?: number | null,
	) {
		this.program_code = program_code;
		this.no_of_household = no_of_household;
		this.bqp_first_name = bqp_first_name;
		this.bqp_last_name = bqp_last_name;
		this.bqp_ssn = bqp_ssn;
		this.bqp_dob = bqp_dob;
		this.public_housing_code = public_housing_code;
	}

	public setProperty(property_name: string, value: any) {
		const prop = property_name as keyof this;
		this[prop] = value;
	}
}
