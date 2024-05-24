import { EventEmitter, Injectable, Output } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class SidebarReadyService {
	@Output() SideBarReady: EventEmitter<void> = new EventEmitter();

	constructor() {}
}
