import { CommonModule } from "@angular/common";
import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	signal,
	WritableSignal,
} from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { ShSimpleModalComponent } from "../../ui-kit/sh-simple-modal/sh-simple-modal.component";
import { ShButtonComponent } from "../../ui-kit/sh-button/sh-button.component";

@Component({
	selector: "sh-change-password-modal",
	templateUrl: "./sh-change-password-modal.component.html",
	styleUrls: ["./sh-change-password-modal.component.scss"],
	standalone: true,
	imports: [CommonModule, ShSimpleModalComponent, FormsModule, ShButtonComponent]
})
export class ShChangePasswordModalComponent {
	@Input() Show: boolean = false;
	@Input() Loading: boolean = false;
	@Input() Close_Button: boolean = true;
	@Input() First_Time: boolean = true;
	@Input() Change_Own: boolean = false;
	@Output() Password: EventEmitter<any> = new EventEmitter<any>();
	@Output() Close: EventEmitter<void> = new EventEmitter<void>();

	// Modal
	public modal_opened: WritableSignal<boolean> = signal<boolean>(false);

	// Change Password
	public show_password: WritableSignal<boolean> = signal<boolean>(false);
	public show_confirm_password: WritableSignal<boolean> =
		signal<boolean>(false);
	public password_check_active: WritableSignal<boolean> =
		signal<boolean>(false);
	public more_than_6: WritableSignal<boolean> = signal<boolean>(false);
	public has_letter: WritableSignal<boolean> = signal<boolean>(false);
	public has_number: WritableSignal<boolean> = signal<boolean>(false);
	public has_special_char: WritableSignal<boolean> = signal<boolean>(false);
	public passwords_match: WritableSignal<boolean> = signal<boolean>(false);

	public all_requirements: WritableSignal<boolean> = signal<boolean>(false);

	public password: WritableSignal<string> = signal<string>("");
	public password_confirmed: WritableSignal<string> = signal<string>("");

	// Change password
	public closeModal() {
		this.Close.emit();
	}

	public async changePassword(form: NgForm) {
		if (!this.Change_Own) {
			this.Password.emit({
				password: form.value.password,
			});
		} else {
			this.Password.emit(form);
		}
	}

	public showPassword(input: "password" | "confirm") {
		if (input === "password") {
			this.show_password.set(!this.show_password());
		} else {
			this.show_confirm_password.set(!this.show_confirm_password());
		}
	}

	public checkPasswordRequirements(value: string) {
		let one_number: RegExp = /\d/;
		let one_letter: RegExp = /[a-zA-Z]/;
		let more_six_char: RegExp = /^.{7,}$/;
		let one_special_char: RegExp = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;

		this.password.set(value);
		this.password_check_active.set(true);

		this.has_letter.set(one_letter.test(value));
		this.has_number.set(one_number.test(value));
		this.more_than_6.set(more_six_char.test(value));
		this.has_special_char.set(one_special_char.test(value));
		this.passwords_match.set(this.password() === this.password_confirmed());

		this.all_requirements.set(
			this.has_letter() &&
				this.has_number() &&
				this.more_than_6() &&
				this.has_special_char() &&
				this.passwords_match(),
		);
	}

	public checkConfirmPassword(value: string) {
		this.password_confirmed.set(value);
		this.passwords_match.set(this.password() === this.password_confirmed());
		this.all_requirements.set(
			this.has_letter() &&
				this.has_number() &&
				this.more_than_6() &&
				this.has_special_char() &&
				this.passwords_match(),
		);
	}
}
