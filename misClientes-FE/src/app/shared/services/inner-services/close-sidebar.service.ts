import { EventEmitter, Injectable, Output } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class CloseSidebarService {
	@Output() close_sidebar: EventEmitter<void> = new EventEmitter();

	constructor() {}
}
