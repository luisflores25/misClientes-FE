import {
	Component,
	OnInit,
	Output,
	EventEmitter,
	signal,
	inject,
	WritableSignal,
} from "@angular/core";
import { NavigationEnd, Router, RouterModule } from "@angular/router";
import { trigger, animate, style, transition } from "@angular/animations";
import { CommonModule, Location, NgOptimizedImage } from "@angular/common";
import { filter, shareReplay } from "rxjs";
import { ModalService } from "../../../services/inner-services/modal.service";
import { SideBarService } from "../../../services/side-bar/side-bar.service";
import { Urls } from "./urls";
import { CloseSidebarService } from "../../../services/inner-services/close-sidebar.service";
import { SidebarOpenedService } from "../../../services/inner-services/sidebar-opened.service";
import { Sidebar_values } from "./sidebar_values";
import { AuthService } from "../../../../core/auth/auth.service";
import { SidebarReadyService } from "../../../services/inner-services/sidebar-ready.service";
import { HttpService } from "../../../../core/http/http-service";

@Component({
	selector: "sh-side-bar",
	templateUrl: "./side-bar.component.html",
	styleUrls: ["./side-bar.component.scss"],
	standalone: true,
	imports: [CommonModule, NgOptimizedImage, RouterModule],

	animations: [
		trigger("onOff", [
			transition(":enter", [
				style({
					opacity: 0,
					transform: "translateY(-10%)",
				}),
				animate(
					"350ms linear",
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
					"50ms linear",
					style({
						transform: "translateY(-10px)",
						opacity: 0,
					}),
				),
			]),
		]),
	],
})
export class SideBarComponent implements OnInit {
	@Output() LoadedFinish: EventEmitter<string> = new EventEmitter<string>();
	@Output() ToggleSideBar = new EventEmitter<any>();

	public items = signal<
		{
			link: string;
			icon: string;
			visible: boolean;
			title: string;
			active: boolean;
			arrow_active?: boolean;
			type: "normal" | "dropdown";
			children_opened?: boolean;
			children?: {
				link: string;
				visible: boolean;
				title: string;
				active: boolean;
			}[];
		}[]
	>([]);
	public url = signal<string>("");
	active: boolean = false;

	rightbar_expanded: boolean = false;
	sidebar_stick: boolean = false;

	loading: boolean = false;
	public modal_opened: WritableSignal<boolean> = signal<boolean>(false);
	private urls: Urls = inject(Urls);
	private router: Router = inject(Router);
	private location: Location = inject(Location);
	private ModalService: ModalService = inject(ModalService);
	private SideBarService: SideBarService = inject(SideBarService);
	private Sidebar_values: Sidebar_values = inject(Sidebar_values);
	private auth_service = inject(AuthService);
	private CloseSidebar: CloseSidebarService = inject(CloseSidebarService);
	private SidebarOpened: SidebarOpenedService = inject(SidebarOpenedService);
	public SidebarReadyService: SidebarReadyService = inject(SidebarReadyService);
	public HttpService: HttpService = inject(HttpService);

	public async ngOnInit() {
		this.url.set(this.router.url);
		await this.checkPermission();

		// Close Sidebar Service
		this.CloseSidebar.close_sidebar.subscribe(() => {
			if (this.active) this.active = false;
			this.Sidebar_values.active = this.active;
		});
	}

	private ngAfterViewChecked() {
		this.ModalService.modal_opened.subscribe((active: boolean) => {
			// this.modal_opened.set(active);
		});
	}

	private async checkPermission() {
		let expiration_time = this.auth_service.getTokenExpirationTime();
		if (expiration_time) {
			if (Date.now() < +expiration_time * 1000) {
				await this.getSideBar();
			}
		}
	}

	private async getSideBar() {
		/*try {
			let res: any = await this.SideBarService.getAll();
			let url_links: string[] = [];
			for (let datum of res.data) {
				// Check the position at pages_urls
				let index = this.urls.pages_urls.findIndex((url) => {
					return url.id === datum.id;
				});

				// Type normal
				if (datum.type === "normal") {
					// If it's found, add to the items
					if (index !== -1) {
						url_links.push(this.urls.pages_urls[index].url);
						this.items().push({
							link: this.urls.pages_urls[index].url,
							icon: this.urls.pages_urls[index].icon,
							visible: true,
							title: datum.title,
							active: false,
							type: datum.type,
						});
					}
				}
				// Type dropdown
				else if (datum.type === "dropdown") {
					this.items().push({
						link: "",
						icon: this.urls.pages_urls[index].icon,
						visible: true,
						title: datum.title,
						active: false,
						type: datum.type,
						children_opened: false,
						children: [],
					});

					// Add the children
					for (let child of datum.children) {
						// Check the position at pages_urls
						let child_index = this.urls.pages_urls.findIndex((url) => {
							return url.id === child.id;
						});
						if (child_index !== -1 && this.items().length) {
							url_links.push(this.urls.pages_urls[child_index].url);
							this.items()[this.items().length - 1].children!.push({
								link: this.urls.pages_urls[child_index].url,
								visible: true,
								title: child.title,
								active: false,
							});
						}
					}
				}
			}
			if (this.items()[0].link) {
				this.LoadedFinish.emit(this.items()[0].link);
			} else {
				this.LoadedFinish.emit(this.items()[0].children![0].link);
			}
			this.urls.user_links = url_links;
			this.SidebarReadyService.SideBarReady.emit();
		} catch (e: any) {
			console.log(e);
			await this.HttpService.handleError(e);
		}*/
		this.LoadedFinish.emit("viajes-management");
		this.SidebarReadyService.SideBarReady.emit();
	}

	public async checkLink(url: string): Promise<void> {
		if (!this.modal_opened()) {
			await this.router.navigate([url]);
			this.router.events
				.pipe(
					filter((event) => event instanceof NavigationEnd),
					shareReplay(1),
				)
				.subscribe((value) => {
					this.url.set(this.location.path());
				});
		}
	}

	public openBlink(id: number) {
		if (!this.active) {
			this.SidebarOpened.sidebar.emit();
		}
		this.active = true;
		this.Sidebar_values.active = this.active;
		this.items()[id].children_opened = !this.items()[id].children_opened;
	}

	public openSideBar(toggle: boolean): void {
		this.SidebarOpened.sidebar.emit();
		if (!this.modal_opened()) {
			if (toggle && this.active) this.sidebar_stick = false;
			if (toggle && !this.active) this.sidebar_stick = true;
			this.active = !this.active;

			this.Sidebar_values.active = this.active;
			if (this.ToggleSideBar)
				this.ToggleSideBar.emit({ sidebar_expanded: this.active });
		}
	}
}
