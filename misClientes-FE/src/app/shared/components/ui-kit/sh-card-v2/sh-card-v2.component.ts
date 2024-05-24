import { Component, Input, Output } from "@angular/core";
import { CardV2Translate } from "src/app/types/custom-types";

@Component({
	selector: "sh-card-v2",
	templateUrl: "./sh-card-v2.component.html",
	styleUrls: ["./sh-card-v2.component.scss"],
})
export class ShCardV2Component {
	@Input() Title: string = "Card Title";
	@Input() ShowTabletAdvantagePlan: boolean = true
	@Input() AdvantagePlan: string = "Advantage Plan";
	@Input() TabletAdvantagePlanCounter: number = 99999;
	@Input() ShowTablet: boolean = true
	@Input() TabletCounter: number = 99991;
	@Input() ShowFreePhone: boolean = true
	@Input() FreePhoneCounter: number = 99992;
	@Input() ShowSim: boolean = true
	@Input() SimCounter: number = 99993;
	@Input() ShowIcon: boolean = false
	@Input() IconImage: string = "assets/img/cards/cards-v2/facebook_1x.webp";
}
