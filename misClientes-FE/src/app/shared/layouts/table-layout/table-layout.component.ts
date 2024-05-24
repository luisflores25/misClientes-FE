import {
	Component,
	EventEmitter,
	inject,
	Input,
	Output,
	signal,
} from "@angular/core";
import { SidebarOpenedService } from "../../services/inner-services/sidebar-opened.service";
import { CloseSidebarService } from "../../services/inner-services/close-sidebar.service";
import { Sidebar_values } from "../../components/essential/side-bar/sidebar_values";
import { SubHeaderComponent } from "../../components/essential/sh-sub-header/sub-header.component";
import { CommonModule } from "@angular/common";

@Component({
	selector: "sh-table-layout",
	templateUrl: "./table-layout.component.html",
	styleUrls: ["./table-layout.component.scss"],
	standalone: true,
	imports: [SubHeaderComponent, CommonModule]
})
export class TableLayoutComponent {
	@Input() Title: string = "";
	@Input() Type: 1 | 2 | 3 = 1;
	@Output() Refresh: EventEmitter<void> = new EventEmitter<void>();
	public sidebar_open = signal<boolean>(false);
	private Sidebar_values: Sidebar_values = inject(Sidebar_values);
	private CloseSidebar: CloseSidebarService = inject(CloseSidebarService);
	private SidebarOpened: SidebarOpenedService = inject(SidebarOpenedService);

	ngOnInit() {
		this.sidebar_open.set(this.Sidebar_values.active);
		this.SidebarOpened.sidebar.subscribe(() => {
			this.sidebar_open.set(!this.sidebar_open());
		});
		this.CloseSidebar.close_sidebar.subscribe(() => {
			if (this.sidebar_open()) this.sidebar_open.set(!this.sidebar_open());
		});
	}

	public refresh() {
		this.Refresh.emit();
	}
}
