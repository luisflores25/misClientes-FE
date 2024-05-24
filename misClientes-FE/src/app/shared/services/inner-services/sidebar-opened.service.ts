import { EventEmitter, Injectable, Output } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class SidebarOpenedService {
	@Output() sidebar: EventEmitter<void> = new EventEmitter();

	constructor() {}
}
