import {
	Component,
	EventEmitter,
	inject,
	Input,
	Output,
	signal,
	SimpleChanges,
} from "@angular/core";
import { ModalService } from "../../../services/inner-services/modal.service";
import { CommonModule } from "@angular/common";
import { ShButtonComponent } from "../sh-button/sh-button.component";

@Component({
	selector: "sh-modal",
	templateUrl: "./sh-modal.component.html",
	styleUrls: ["./sh-modal.component.scss"],
	standalone: true,
	imports: [CommonModule, ShButtonComponent]
})
export class ShModalComponent {
	@Input() Show: boolean = false;
	@Input() Cancel_Btn: boolean = true;
	@Input() Loader: boolean = false;
	@Output() Close = new EventEmitter();
	@Output() Submit = new EventEmitter();

	private ModalService: ModalService = inject(ModalService);

	private ngOnChanges(changes: any): void {
		this.ModalService.modal_opened.emit(this.Show);
	}

	public close() {
		this.Close.emit();
	}

	public submit() {
		this.Submit.emit({ params: this });
	}
}
