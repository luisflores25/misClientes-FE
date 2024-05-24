import { EventEmitter, Injectable, Output } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class ModalService {
	@Output() modal_opened: EventEmitter<boolean> = new EventEmitter();

	constructor() {}
}
