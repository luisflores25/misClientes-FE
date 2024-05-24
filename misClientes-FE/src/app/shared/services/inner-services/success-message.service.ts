import { EventEmitter, Injectable, Output } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class SuccessMessageService {
	@Output() SuccessMessage: EventEmitter<{
		message: string;
		show: boolean;
		error: boolean;
	}> = new EventEmitter();

	constructor() {}
}
