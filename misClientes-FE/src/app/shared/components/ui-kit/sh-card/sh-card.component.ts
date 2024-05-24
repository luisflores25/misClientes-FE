import { Component, EventEmitter, Input, Output } from "@angular/core";

export interface Cards {
	id: number;
	name: string;
	title: string;
	icon: string;
	quantity: string | number;
	loading: boolean;
	errors: boolean;
}

@Component({
	selector: "sh-card",
	templateUrl: "./sh-card.component.html",
	styleUrls: ["./sh-card.component.scss"],
})
export class ShCardComponent {
	@Input() Info: Cards | undefined;
	@Input() Customize: boolean = false;
	@Input() CardInfo: {
		type: string;
		id: number;
		sub: number;
		size: string;
	} = {
		type: "",
		id: 0,
		sub: 0,
		size: "",
	};
	//Status
	@Input() Loading: boolean = true;
	@Input() Errors: boolean = false;
	@Input() NoData: boolean = false;
	@Output() RefreshContent = new EventEmitter<any>();
	@Output() ChangeWidget = new EventEmitter<any>();

	public refresh_content() {
		this.RefreshContent.emit();
	}

	change_content() {
		this.ChangeWidget.emit({
			type: "new",
			id: this.CardInfo.id,
			sub: this.CardInfo.sub,
			size: this.CardInfo.size,
		});
	}
}
