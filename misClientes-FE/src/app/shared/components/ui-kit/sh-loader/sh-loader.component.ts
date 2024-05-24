import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
	selector: "sh-loader",
	templateUrl: "./sh-loader.component.html",
	styleUrls: ["./sh-loader.component.scss"],
	standalone: true,
	imports: [CommonModule]
})
export class ShLoaderComponent {
	@Input() Width: string = "25px";
	@Input() Height: string = "25px";
	@Input() Color: string = "#fff";
}
