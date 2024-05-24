import {
	Component,
	inject,
	Input,
	signal,
	WritableSignal,
} from "@angular/core";
import { NavigationEnd, Router, RouterModule } from "@angular/router";
import { filter, shareReplay } from "rxjs";
import { AuthService } from "../../../core/auth/auth.service";
import { CloseSidebarService } from "../../services/inner-services/close-sidebar.service";
import { SidebarOpenedService } from "../../services/inner-services/sidebar-opened.service";
import { SuccessMessageService } from "../../services/inner-services/success-message.service";
import { LoginService } from "../../services/login/login.service";
import { HttpService } from "../../../core/http/http-service";
import { CloseTopActionsService } from "../../services/inner-services/layout/close-top-actions.service";
import { ShSuccessMessageComponent } from "../../components/ui-kit/sh-success-message/sh-success-message.component";
import { HeaderComponent } from "../../components/essential/header/header.component";
import { SideBarComponent } from "../../components/essential/side-bar/side-bar.component";
import { CommonModule, NgClass } from "@angular/common";
import { AppRoutingModule } from "../../../app-routing.module";

@Component({
	selector: "app-layout",
	templateUrl: "./layout.component.html",
	styleUrls: ["./layout.component.scss"],
	standalone: true,
	imports: [ShSuccessMessageComponent, HeaderComponent, SideBarComponent, CommonModule, RouterModule]
})
export class LayoutComponent {
	public sidebar_open = signal<boolean>(false);

	private router: Router = inject(Router);
	private AuthService: AuthService = inject(AuthService);
	private LoginService: LoginService = inject(LoginService);
	private CloseTopActionsService: CloseTopActionsService = inject(
		CloseTopActionsService,
	);
	private CloseSidebar: CloseSidebarService = inject(CloseSidebarService);
	private SidebarOpened: SidebarOpenedService = inject(SidebarOpenedService);
	public SuccessMessageService: SuccessMessageService = inject(
		SuccessMessageService,
	);
	public HttpService: HttpService = inject(HttpService);

	public access: WritableSignal<boolean> = signal<boolean>(false);
	public loaded_data: WritableSignal<boolean> = signal<boolean>(false);

	// Success Message
	public success_message_msg: WritableSignal<string> = signal<string>("");
	public success_message_show: WritableSignal<boolean> = signal<boolean>(false);
	public success_message_error: WritableSignal<boolean> =
		signal<boolean>(false);

	// Modal
	public show_modal: WritableSignal<boolean> = signal<boolean>(false);
	public modal_loading: WritableSignal<boolean> = signal<boolean>(false);
	public modal_close_btn: WritableSignal<boolean> = signal<boolean>(false);

	private async ngOnInit() {
		this.checkToken();

		try {
			let res = await this.LoginService.getProfile();

			if (res) {
				let data = res.data;
				this.loaded_data.set(true);
			}
		} catch (e: any) {
			console.log(e);
			if (e.response && e.response.data) {
				this.SuccessMessageService.SuccessMessage.emit({
					message: e.response.data.msg,
					show: true,
					error: true,
				});
			} else {
				this.SuccessMessageService.SuccessMessage.emit({
					message: "Connection error",
					show: true,
					error: true,
				});
				localStorage.clear();
				await this.router.navigate(["/login"]);
			}
			await this.HttpService.handleError(e);
		}

		this.SidebarOpened.sidebar.subscribe(() => {
			this.sidebar_open.set(!this.sidebar_open());
		});

		this.SuccessMessageService.SuccessMessage.subscribe((service) => {
			this.success_message_msg.set(service.message);
			this.success_message_error.set(service.error);
			this.success_message_show.set(true);
			this.show_success_msg();
		});

		this.router.events
			.pipe(
				filter((event) => event instanceof NavigationEnd),
				shareReplay(1),
			)
			.subscribe((): void => {
				this.checkToken();
			});
	}

	// TOKEN
	private checkToken() {
		this.AuthService.handleTokenExpiration();
	}

	public sidebarExpanded(event: any) {
		this.sidebar_open.set(event.sidebar_expanded);
	}

	public closeSidebar() {
		this.CloseSidebar.close_sidebar.emit();
		this.closeHeaderActions();
	}

	public closeHeaderActions() {
		this.CloseTopActionsService.close.emit();
	}

	async checkFirstUrl(url: string) {
		let current_url = this.router.url;
		console.log(url)
		if (current_url === "/layout") {
			if (!url.includes("layout")) {
				let new_url = "/layout/" + url;
				await this.router.navigate([new_url]);
			} else {
				await this.router.navigate([url]);
			}
		}
	}

	private show_success_msg(): void {
		this.success_message_show.set(true);
		setTimeout(() => {
			this.success_message_show.set(false);
		}, 5000);
	}


	public closeModal() {
		this.show_modal.set(false);
		this.modal_loading.set(false);
	}
}
