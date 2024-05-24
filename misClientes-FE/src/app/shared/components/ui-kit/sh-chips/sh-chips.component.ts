import { Component, Input, OnInit, EventEmitter, Output } from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";

type Colors =
	| "red"
	| "yellow"
	| "green"
	| "dark-green"
	| "blue"
	| "purple"
	| "gray"
	| "dark-gray"
	| "empty";

const transformObject: { [key: string]: { Label: string; Color: Colors } } = {
	"not-verified": { Label: "Not Verified", Color: "gray" },
	audited: { Label: "Audited", Color: "green" },
	not_audited: { Label: "Not Audited", Color: "red" },
	"do-not-rehire": { Label: "Do not rehire", Color: "red" },
	"in-progress": { Label: "In progress", Color: "yellow" },
	"pre-created": { Label: "Pre created", Color: "purple" },
	reset: { Label: "Reset", Color: "purple" },
	"in-stock": { Label: "In stock", Color: "blue" },
	"sold-rma": { Label: "Sold NFC", Color: "green" },
	"pending-for-approval": { Label: "Pending approval", Color: "yellow" },
	sold: { Label: "Sold", Color: "green" },
	returned: { Label: "Returned", Color: "purple" },
	rma: { Label: "RMA", Color: "yellow" },
	approved: { Label: "Approved", Color: "purple" },
	"shipping-label": { Label: "Shipping Label", Color: "purple" },
	shipped: { Label: "Shipped", Color: "blue" },
	completed: { Label: "Completed", Color: "green" },
	complete: { Label: "Complete", Color: "green" },
	canceled: { Label: "Canceled", Color: "red" },
	"drop-off": { Label: "Drop Off", Color: "purple" },
	"pick-up": { Label: "Pick up", Color: "purple" },
	pending: { Label: "Pending", Color: "purple" },
	denied: { Label: "Denied", Color: "red" },
	active: { Label: "Active", Color: "blue" },
	Active: { Label: "Active", Color: "blue" },
	TRUE: { Label: "True", Color: "blue" },
	FALSE: { Label: "False", Color: "red" },
	inactive: { Label: "Inactive", Color: "dark-gray" },
	Inactive: { Label: "Inactive", Color: "dark-gray" },
	suspended: { Label: "Suspended", Color: "gray" },
	new: { Label: "New", Color: "green" },
	appointed: { Label: "Appointed", Color: "purple" },
	contacted: { Label: "Contacted", Color: "blue" },
	closed: { Label: "Closed", Color: "dark-gray" },
	terminated: { Label: "Terminated", Color: "dark-gray" },
	Cash: { Label: "Cash", Color: "green" },
	"Credit Card": { Label: "Credit Card", Color: "blue" },
	true: { Label: "True", Color: "green" },
	false: { Label: "False", Color: "dark-gray" },
	Yes: { Label: "Yes", Color: "green" },
	No: { Label: "No", Color: "dark-gray" },
};

@Component({
	selector: "sh-chips",
	standalone: true,
	imports: [CommonModule, NgOptimizedImage],
	templateUrl: "./sh-chips.component.html",
	styleUrls: ["./sh-chips.component.scss"],
})
export class ShChipsComponent implements OnInit {
	@Input() Label: string = "Example";
	@Input() Colors: Colors | undefined;
	@Input() Bold: boolean = false;
	@Input() Close: boolean = false;
	@Output() CloseEvent: EventEmitter<any> = new EventEmitter();

	style: string = "";

	constructor() {}

	ngOnInit(): void {
		if (this.Label !== undefined && this.Label !== null) {
			const fieldName = this.Label.toString();
			if (transformObject[fieldName]) {
				this.Label = transformObject[fieldName].Label;
			}
			if (!this.Colors && transformObject[fieldName]?.Color) {
				this.Colors = transformObject[fieldName].Color;
			}
			this.style = `sh-${this.Colors} chip-label`;
		} else {
			this.Colors = "blue";
			this.Label = "No data";
			this.style = `sh-${this.Colors} chip-label`;
		}
	}

	close_function() {
		this.CloseEvent?.emit();
	}
}
