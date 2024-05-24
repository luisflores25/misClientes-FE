import { animate, style, transition, trigger } from "@angular/animations";
import { Component, inject, signal } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { LocalStorageService } from "../../core/local-storage/local-storage.service";
import { AuthService } from "../../core/auth/auth.service";
import { jwtDecode } from "jwt-decode";
import { Router } from "@angular/router";
import { LoginData } from "./login.data";
import { ShSuccessMessageComponent } from "../../shared/components/ui-kit/sh-success-message/sh-success-message.component";
import { ShButtonComponent } from "../../shared/components/ui-kit/sh-button/sh-button.component";
import { CommonModule, NgOptimizedImage } from "@angular/common";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
	standalone: true,
	imports: [ShSuccessMessageComponent, ShButtonComponent,FormsModule, CommonModule, NgOptimizedImage],
	animations: [
		trigger("onOff", [
			transition(":enter", [
				style({
					opacity: 0,
					transform: "translateY(-40px)",
				}),
				animate(
					"500ms linear",
					style({
						transform: "translateY(0px)",
						opacity: 1,
					}),
				),
			]),
			transition(":leave", [
				style({
					opacity: 1,
					transform: "translateY(0px)",
				}),
				animate(
					"300ms linear",
					style({
						transform: "translateY(-10px)",
						opacity: 0,
					}),
				),
			]),
		]),
	],
})
export class LoginComponent {
	public login_error = signal<boolean>(false);
	public button_loading = signal<boolean>(false);

	// Success message
	public msg = signal<string>("");
	public show_msg = signal<boolean>(false);
	public error_msg = signal<boolean>(false);

	private router = inject(Router);
	private LoginData: LoginData = inject(LoginData);
	private auth_service = inject(AuthService);
	private local_storage_service = inject(LocalStorageService);

	async ngOnInit() {
		let expiration_time = this.auth_service.getTokenExpirationTime();
		if (expiration_time) {
			if (Date.now() < +expiration_time * 1000) {
				await this.router.navigate(["/layout"]);
			}
		}
	}

	private show_success_msg(): void {
		this.show_msg.set(true);
		setTimeout(() => {
			this.show_msg.set(false);
		}, 5000);
	}

	public async handleLogin(form: NgForm) {
		this.button_loading.set(true);
		try {
			console.log(form.value)
			const res = await this.auth_service.login(form.value);
			
			const decoded: {
				exp: number;
				iat: number;
				user_email_address: string;
				user_id: number;
			} = jwtDecode(res.data.data.jwt);

			this.local_storage_service.setItem("authToken", res.data.data.jwt);
			this.local_storage_service.setItem(
				"full_name",
				res.data.data.user_full_name,
			);
			this.local_storage_service.setItem(
				"email_address",
				res.data.data.user_email_address,
			);
			this.local_storage_service.setItem("exp", decoded.exp);
			await this.router.navigate(["/layout"]);
		} catch (err: any) {
			this.button_loading.set(false);
			if (err.response) {
				this.msg.set(err.response.data.msg);
				this.login_error.set(true);
			} else {
				this.msg.set("Server error");
				this.login_error.set(true);
			}
			this.error_msg.set(true);
			this.show_success_msg();
		}
	}

	focusPassword() {
		this.login_error.set(false);
	}
}
