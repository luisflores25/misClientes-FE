import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
	selector: "sh-pagination",
	templateUrl: "./sh-pagination.component.html",
	styleUrls: ["./sh-pagination.component.scss"],
	standalone: true,
	imports: [CommonModule]
})
export class ShPaginationComponent {
	@Input() p = 1;
	@Input() pp = 1;

	@Input() totalCount: number = 0;

	@Input() Loader: boolean = false;

	@Output() Next: EventEmitter<void> = new EventEmitter<void>();
	@Output() Back: EventEmitter<void> = new EventEmitter<void>();

	/** Pagination */
	public nextPage(): void {
		if (this.p < this.num_pages) {
			this.p = this.p + 1;
			this.Next.emit();
		}
	}

	public backPage(): void {
		if (this.p > 1) {
			this.p = this.p - 1;
			this.Back.emit();
		}
	}

	get num_pages() {
		if (+this.pp == 0) {
			return 0;
		}
		return Math.ceil(+this.totalCount / +this.pp);
	}
}
