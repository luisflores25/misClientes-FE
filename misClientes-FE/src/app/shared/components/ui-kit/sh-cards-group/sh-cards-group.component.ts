import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
	selector: "sh-cards-group",
	templateUrl: "./sh-cards-group.component.html",
	styleUrls: ["./sh-cards-group.component.scss"],
})
export class ShCardsGroupComponent {
	@Input() Title: string = "Title test";
	@Input() Loading: boolean = false;
	@Output() Refresh: EventEmitter<void> = new EventEmitter<void>();

	@Input() Cards: {
		title: string;
		value: string;
		icon: string;
	}[] = [];

	public refresh() {
		this.Refresh.emit();
	}
}
