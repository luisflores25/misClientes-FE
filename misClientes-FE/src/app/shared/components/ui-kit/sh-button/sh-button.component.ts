import { CommonModule } from "@angular/common";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ShLoaderComponent } from "../sh-loader/sh-loader.component";

@Component({
	selector: "sh-button",
	templateUrl: "./sh-button.component.html",
	styleUrls: ["./sh-button.component.scss"],
	standalone: true,
	imports: [CommonModule, ShLoaderComponent]
})
export class ShButtonComponent implements OnInit {
	@Input() type: string = "button";
	@Input() variant:
		| "filled"
		| "outline"
		| "invisible"
		| "borderless"
		| "light"
		| "outline-dark"
		| "outline-warning"
		| "outline-secondary"
		| "borderless-secondary" = "filled";
	@Input() size: "sm" | "md" | "lg" | "full" = "sm";
	@Input() icon: "left" | "right" | "none" | "only" = "none";
	@Input() text: string = "";
	@Input() disabled: boolean = false;
	@Input() loading: boolean = false;
	@Input() icon_src: string = "../../../assets/img/plus-sm.svg";
	@Output() btnClick = new EventEmitter();

	constructor() {}

	ngOnInit(): void {}

	onClick() {
		if (!this.loading) this.btnClick.emit();
	}
}
