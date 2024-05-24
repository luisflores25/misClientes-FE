import { CommonModule, NgOptimizedImage } from "@angular/common";
import { Component, EventEmitter, Input, Output, signal } from "@angular/core";

@Component({
	selector: "sh-tab-cards",
	templateUrl: "./sh-tab-cards.component.html",
	styleUrls: ["./sh-tab-cards.component.scss"],
	standalone: true,
	imports: [CommonModule, NgOptimizedImage]
})
export class ShTabCardsComponent {
	@Input() Loading: boolean = false;
	@Input() Error: boolean = false;
	@Input() Tabs: {
		show: boolean;
		tabs: { name: string; label: string; active: boolean }[];
	} = {
		show: false,
		tabs: [],
	};
	@Input() Cards: {
		icon: string;
		main: {
			id: string;
			label: string;
			amount: string;
		};
		secondary: {
			id: string;
			label: string;
			amount: string;
		};
	}[] = [];

	@Output() ChangeTab: EventEmitter<string> = new EventEmitter<string>();

	public skeleton = [
		{
			icon: "",
			main: {
				label: "",
				amount: "",
			},
			secondary: {
				label: "",
				amount: "",
			},
		},
		{
			icon: "",
			main: {
				label: "",
				amount: "",
			},
			secondary: {
				label: "",
				amount: "",
			},
		},
		{
			icon: "",
			main: {
				label: "",
				amount: "",
			},
			secondary: {
				label: "",
				amount: "",
			},
		},
	];

	public tabs = signal<{
		show: boolean;
		tabs: { name: string; label: string; active: boolean }[];
	}>({
		show: false,
		tabs: [],
	});

	ngOnChanges() {
		if (this.Tabs.tabs.length) {
			this.tabs.set(structuredClone(this.Tabs));
		}
	}

	public selectTab(index: number, name: string) {
		for (const tab of this.tabs().tabs) {
			tab.active = false;
		}
		this.tabs().tabs[index].active = true;

		this.ChangeTab.emit(name);
	}
}
