import { EventEmitter, Injectable, Output } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class TableClearFiltersService {
	@Output() clear: EventEmitter<void> = new EventEmitter();

	constructor() {}
}
