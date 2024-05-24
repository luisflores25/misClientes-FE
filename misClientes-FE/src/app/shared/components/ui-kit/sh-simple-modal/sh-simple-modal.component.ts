import { Component, inject, Input } from "@angular/core";
import { animate, style, transition, trigger } from "@angular/animations";
import { ModalService } from "../../../services/inner-services/modal.service";
import { CommonModule } from "@angular/common";

@Component({
	selector: "sh-simple-modal",
	templateUrl: "./sh-simple-modal.component.html",
	styleUrls: ["./sh-simple-modal.component.scss"],
	standalone: true,
	imports: [CommonModule],
	animations: [
		trigger("show", [
			transition(":enter", [
				style({
					opacity: 0,
				}),
				animate(
					"350ms linear",
					style({
						opacity: 1,
					}),
				),
			]),
			transition(":leave", [
				style({
					opacity: 1,
					// transform: "translateY(0px)"
				}),
				animate(
					"350ms linear",
					style({
						// transform: "translateY(-10px)",
						opacity: 0,
					}),
				),
			]),
		]),
	],
})
export class ShSimpleModalComponent {
	@Input() Show: boolean = false;

	private ModalService: ModalService = inject(ModalService);

	private ngOnChanges(): void {
		this.ModalService.modal_opened.emit(this.Show);
	}
}
