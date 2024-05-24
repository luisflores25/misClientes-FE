import {
	Component,
	EventEmitter,
	HostListener,
	Output,
	inject,
	signal,
} from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { ModalService } from "../../../services/inner-services/modal.service";
import { CloseSidebarService } from "../../../services/inner-services/close-sidebar.service";
import { LocalStorageService } from "../../../../core/local-storage/local-storage.service";
import { CloseTopActionsService } from "../../../services/inner-services/layout/close-top-actions.service";
import { CommonModule, NgOptimizedImage } from "@angular/common";

@Component({
	selector: "sh-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
	standalone: true,
	imports: [CommonModule, RouterModule, NgOptimizedImage]
})
export class HeaderComponent {
	@Output() logout = new EventEmitter();
	@Output() Change_Password: EventEmitter<void> = new EventEmitter();

	// private LoginData = inject(LoginData);
	sidebar_expanded: any = false;
	public options = signal<boolean>(false);
	initial_letter: string = "";
	user_data: {
		user_full_name: string;
		user_email_address: string;
		profile_picture_file_id: string;
	} = {
		user_full_name: "-",
		user_email_address: "--",
		profile_picture_file_id: "",
	};
	profile_picture: string | null = null;
	public menu_open = signal<boolean>(false);

	getScreenWidth: number = 0;
	getScreenHeight: number = 0;

	public modal_opened = signal<boolean>(false);

	private router: Router = inject(Router);
	private ModalService: ModalService = inject(ModalService);
	private CloseSidebar: CloseSidebarService = inject(CloseSidebarService);
	private local_storage_service = inject(LocalStorageService);
	private CloseTopActionsService: CloseTopActionsService = inject(
		CloseTopActionsService,
	);

	async ngOnInit() {
		this.user_data.user_full_name =
			this.local_storage_service.getItem("full_name") || "-";
		this.user_data.user_email_address =
			this.local_storage_service.getItem("email_address") || "-";

		this.initial_letter = this.user_data.user_full_name.charAt(0).toUpperCase();
	}

	private ngAfterViewChecked() {
		this.ModalService.modal_opened.subscribe((active: boolean) => {
			// this.modal_opened.set(active);
			// this.options.set(false);
		});
		this.CloseTopActionsService.close.subscribe(() => {
			if (this.options()) {
				this.options.set(false);
			}
		});
	}

	public async logOut(): Promise<void> {
		this.local_storage_service.removeItem("exp");
		this.local_storage_service.removeItem("authToken");
		this.local_storage_service.removeItem("full_name");
		this.local_storage_service.removeItem("email_address");
		await this.router.navigate(["/"]);
		this.options.set(!this.options());
	}

	@HostListener("window:resize", ["$event"])
	onWindowResize() {
		this.getScreenWidth = window.innerWidth;
		this.getScreenHeight = window.innerHeight;
	}

	show_toggle_menu() {
		this.open_menu();
	}

	open_menu() {
		this.menu_open.set(!this.menu_open());
	}

	openOptions(): void {
		this.options.set(!this.options());
	}

	public changePassword() {
		this.Change_Password.emit();
	}

	closeSidebar() {
		this.CloseSidebar.close_sidebar.emit();
	}
}
