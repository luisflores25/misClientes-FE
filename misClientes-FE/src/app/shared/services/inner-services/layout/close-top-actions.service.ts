import { EventEmitter, Injectable, Output } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class CloseTopActionsService {
	@Output() close: EventEmitter<void> = new EventEmitter();

	constructor() {}
}
