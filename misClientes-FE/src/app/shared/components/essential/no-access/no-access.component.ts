import { CommonModule, NgOptimizedImage } from "@angular/common";
import { Component, inject, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "no-access-component",
	templateUrl: "./no-access.component.html",
	styleUrls: ["./no-access.component.scss"],
	standalone: true,
	imports: [CommonModule, NgOptimizedImage]
})
export class NoAccessComponent {
	@Input() Custom_Msg: string = "";
	@Input() Custom_Btn: { btn_label: string; url: string } | undefined;

	private router: Router = inject(Router);

	navigate(url: string) {
		this.router.navigate([url]);
	}
}
