import { Component, EventEmitter, Input, Output, Type } from "@angular/core";
import { CardV2, CardV2Translate } from "src/app/types/custom-types";

@Component({
	selector: "sh-cards-group-v2",
	templateUrl: "./sh-cards-group-v2.component.html",
	styleUrls: ["./sh-cards-group-v2.component.scss"],
})
export class ShCardsGroupV2Component {
	@Input() Title: string = "Title Undefined";
	@Input() Loading: boolean = false;
	@Output() Refresh: EventEmitter<void> = new EventEmitter<void>();

	@Input() Cards: CardV2 = {};
	@Input() CardsKeys: (keyof CardV2)[] = Object.keys(
		this.Cards,
	) as (keyof CardV2)[];

	private keys_icon: {
		[key: string]: string;
	} = {
		today_facebook_ads: "assets/img/cards/cards-v2/facebook_1x.webp",
		today_google_ads: "assets/img/cards/cards-v2/google_1x.webp",
	} as const;

	public refresh() {
		this.Refresh.emit();
	}

	getTitle(key: keyof CardV2): string {
		return CardV2Translate[key] as string;
	}

	showIcon(key: keyof CardV2): boolean {
		if (Object.keys(this.keys_icon).includes(key)) {
			return true;
		} else {
			return false;
		}
	}

	getIconImage(key: keyof CardV2): string {
		const stringKey = key as string;
		const keyList = Object.keys(this.keys_icon);
		if (keyList.includes(key)) {
			return this.keys_icon[stringKey];
		} else {
			return "";
		}
	}
}
