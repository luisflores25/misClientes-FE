import {
	Component,
	EventEmitter,
	inject,
	Input,
	Output,
	signal,
	SimpleChanges,
	WritableSignal,
} from "@angular/core";
import {
	debounceTime,
	distinctUntilChanged,
	Subject,
	Subscription,
	take,
} from "rxjs";
import dateFormat from "../../../../shared/helpers/dateFormat";
import dateTimeFormat from "../../../../shared/helpers/dateTimeFormat";
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Column } from "../../../../../models/TableColumn.model";
import { filtersFormat } from "./filtersFormat";
import numberFormat from "../../../helpers/numberFormat";
import { TableClearFiltersService } from "../../../services/inner-services/table-clear-filters-service/table-clear-filters.service";
import { CommonModule } from "@angular/common";
import { ShButtonComponent } from "../sh-button/sh-button.component";
import { ShChipsComponent } from "../sh-chips/sh-chips.component";
import { ShToggleComponent } from "../sh-toggle/sh-toggle.component";
import { ShPaginationComponent } from "../sh-pagination/sh-pagination.component";

type headArrayType = Column & {
	show_filter: boolean;
	active: boolean;
	headerName: string;
	filters: {
		descending: boolean;
		ascending: boolean;
		search: "";
	};
	possible_values_array: string[];
	type: string;
};

@Component({
	selector: "sh-table",
	templateUrl: "./sh-table.component.html",
	styleUrls: ["./sh-table.component.scss"],
	standalone: true,
	imports: [CommonModule, FormsModule, ShButtonComponent, ReactiveFormsModule, ShChipsComponent, ShToggleComponent, ShPaginationComponent]
})
export class ShTableComponent<
	T extends { id: number; check_box_active?: boolean },
> {
	@Input() Title: string = "";
	@Input() Total_Count: string = "Add account";
	@Input() Total_Count_Number: number = 0;
	@Input() Columns: {
		columns: any[];
		sortable_types: string[];
		searchable_types: string[];
		filters: {
			id: string;
			name: string;
		}[];
	} = {
		columns: [],
		sortable_types: [],
		searchable_types: [],
		filters: [],
	};
	@Input() Content: any[] = [];
	@Input() Loading: boolean = true;
	@Input() Action_Loading: boolean = true;
	@Input() Date_Search: boolean = false;

	// Change Role
	@Output() ChangeRoleColumns: EventEmitter<void> = new EventEmitter<void>();
	@Input() ChangeRoleArray: { id: number; name: string }[] = [];
	@Output() InlineEditAction: EventEmitter<{
		id: number;
		column: string;
		value: string | number;
		editable_columns: any[];
	}> = new EventEmitter<{
		id: number;
		column: string;
		value: string | number;
		editable_columns: any[];
	}>();

	//HEADER
	@Input() P: number = 0;
	@Input() Pp: number = 0;
	@Output() Refresh: EventEmitter<void> = new EventEmitter<void>();
	@Input() Filter_Preset: boolean = false;
	@Input() Default_Filter: string = "";

	// Record History
	@Input() Record_History: boolean = false;
	@Input() Record_History_Loading: boolean = false;
	@Input() Record_History_Loading_Id: number = -1;
	@Input() Record_History_Data_Changes: any[] = [];
	@Input() Is_History: boolean = false;
	@Output() Action: EventEmitter<{
		column: string;
		id: number;
	}> = new EventEmitter<{ column: string; id: number }>();
	@Output() RecordHistory: EventEmitter<number> = new EventEmitter<number>();

	// Filters
	@Input() Filter: {
		active: boolean;
		options: {
			date_range?: {
				active: boolean;
				options: { name: string; label: string }[];
				column: string;
			};
			date_from?: { active: boolean; column: string };
			date_to?: { active: boolean; column: string };
			status?: { active: boolean; options: { name: string; label: string }[] };
		};
	} = {
		active: false,
		options: {},
	};
	@Output() Filters: EventEmitter<
		{
			column: string;
			search: string;
			ascending: boolean;
			descending: boolean;
			start: string;
			end: string;
			is_exact: boolean;
		}[]
	> = new EventEmitter<
		{
			column: string;
			search: string;
			ascending: boolean;
			descending: boolean;
			start: string;
			end: string;
			is_exact: boolean;
		}[]
	>();

	// Pagination
	@Input() Pagination: boolean = true;
	@Input() Pagination_Loading: boolean = true;
	@Output() Next: EventEmitter<void> = new EventEmitter<void>();
	@Output() Back: EventEmitter<void> = new EventEmitter<void>();

	@Input() Toggle_Loading: boolean = false;
	@Output() Toggle_Switch: EventEmitter<{
		id: number;
		column: string;
		value: boolean;
	}> = new EventEmitter<{ id: number; column: string; value: boolean }>();

	public filter_value: WritableSignal<string> = signal<string>("");

	public showColumns: boolean = false;
	public search_word: Subject<string> = new Subject<string>();
	public content: WritableSignal<any[]> = signal<any[]>([]);
	public active_filters: WritableSignal<
		{
			id: string;
			position: number;
			label: string;
			value: string;
			type: string;
			filters?: any;
		}[]
	> = signal<
		{
			id: string;
			position: number;
			label: string;
			value: string;
			type: string;
		}[]
	>([]);
	public actions_array: any[] = ["Display columns", "Download file", "Filters"];

	// Filters
	public showFilters: boolean = false;
	public filters_form: FormGroup = new FormGroup({
		date_range: new FormControl(),
		status: new FormControl(),
		from: new FormControl(),
		to: new FormControl(),
	});
	private column_id: WritableSignal<string> = signal("");

	// FILTERS
	public filtersForm(Event: {
		date_range: string;
		status: string;
		from: string;
		to: string;
	}) {}

	@Output() Select_Preset: EventEmitter<string> = new EventEmitter<string>();

	private editable_columns: WritableSignal<string[]> = signal<string[]>([]);

	// Injections
	public filtersFormat: filtersFormat = inject(filtersFormat);
	private TableClearFiltersService: TableClearFiltersService = inject(
		TableClearFiltersService,
	);

	private suscription: Subscription | undefined;

	private previous_value: any;

	private click_position: WritableSignal<number> = signal<number>(0);

	constructor() {
		this.search_word
			.pipe(debounceTime(800), distinctUntilChanged())
			.subscribe((text: string) => {
			});
	}

	private ngOnChanges(changes: SimpleChanges): void {
		if (
			changes["Columns"] &&
			changes["Columns"].currentValue !== changes["Columns"].previousValue
		) {
			this.editable_columns.set([]);
			if (this.Columns.columns && this.Columns.columns.length) {
				for (let column of this.Columns.columns) {
					if (column.is_editable) {
						this.editable_columns().push(column.id);
					}
					column.show_filter = false;
					column.filters = {
						descending: false,
						ascending: false,
						search: "",
						start: "",
						end: "",
						blank: false,
						not_blank: false,
						is_exact: false
					};
				}
			}
		}
		if (
			changes["Content"] &&
			changes["Content"].currentValue &&
			changes["Content"].currentValue.length
		) {
			this.content.set(this.Content);
			for (let contentElement of this.content()) {
				for (let column of this.editable_columns()) {
					contentElement[column] = {
						value: contentElement[column],
						active: false,
					};
				}
				contentElement = Object.assign(contentElement, {
					short: true,
					row_loading: false,
				});
			}
			if (changes["Loading"] && !this.Loading) {
				if (this.column_id()) {
					this.autoScroll(this.column_id());
				}
				this.column_id.set("");
			}
		}
	}

	private ngAfterViewChecked() {
		this.suscription = this.TableClearFiltersService.clear
			.pipe(take(1))
			.subscribe(() => {
				if (this.active_filters().length && this.Columns) {
					if (this.Columns.columns.length) {
						this.Columns.columns.forEach((column) => {
							column.filters = {
								descending: false,
								ascending: false,
								search: "",
								start: "",
								end: "",
								blank: false,
								not_blank: false,
								is_exact: false
							};
						});
					}
					this.active_filters.set([]);
				}
			});
	}

	private ngOnDestroy() {
		if (this.suscription) {
			this.suscription.unsubscribe();
		}
	}

	//TABLE HEADER FILTERS
	public clearAllFilters(): void {
		this.Columns.columns.forEach((column) => {
			column.filters = {
				descending: false,
				ascending: false,
				search: "",
				start: "",
				end: "",
				blank: false,
				not_blank: false,
				is_exact: false
			};
		});
		this.active_filters.set([]);
		this.Filters.emit([]);
		this.column_id.set("");
	}

	public changeFiltersSelect(value: string) {
		this.filter_value.set(value);
		this.Select_Preset.emit(value);
	}

	public clearFiltersSelect() {
		this.changeFiltersSelect("");
	}

	public clearColumnFilters(column: any): void {
		this.closeFilter();
		column.filters = {
			descending: false,
			ascending: false,
			search: "",
			start: "",
			end: "",
			blank: false,
			not_blank: false,
			is_exact: false
		};
		this.active_filters.set(
			this.active_filters().filter((filter) => filter.id !== column.id),
		);
		this.Filters.emit(this.formatFilters());
		this.column_id.set(column.id);
	}

	public deleteSingleFilter(filter: any, index: number) {
		let column = this.Columns.columns.find((column) => {
			return column.id === filter.id;
		});
		if (column) {
			if (filter.type === "ascending_descending") {
				column.filters.descending = false;
				column.filters.ascending = false;
			} else if (filter.type.includes("_search")) {
				column.filters.search = "";
			} else if (filter.type.includes("_start")) {
				column.filters.start = "";
			} else if (filter.type.includes("_end")) {
				column.filters.end = "";
			} else if (filter.type.includes("_not_blank")) {
				column.filters.not_blank = false;
			} else if (filter.type.includes("_blank")) {
				column.filters.blank = false;
			}
			this.active_filters().splice(index, 1);
			this.Filters.emit(this.formatFilters());
			this.column_id.set(column.id);
		}
	}

	public filtersApply(column: any, position: number): void {
		this.active_filters.set(
			this.filtersFormat.addFilterChips(
				this.active_filters(),
				column,
				position,
			),
		);
		this.Filters.emit(this.formatFilters());
		this.closeFilter();
		this.column_id.set(column.id);
	}

	private formatFilters() {
		let all_filters: any = this.active_filters().map((filter) => {
			return { ...filter.filters, column: filter.id };
		});
		return all_filters;
	}

	public closeFilter(): void {
		this.Columns.columns.forEach((item: any) => {
			item.show_filter = false;
		});
	}

	public setFilterPopupToShow(column: headArrayType, click_event: any): void {
		this.click_position.set(click_event.layerX - click_event.x);
		this.closeFilter();
		column.show_filter = !column.show_filter;
	}

	public actions() {
		this.showColumns = !this.showColumns;
	}

	public showFiltersSelect() {
		this.showFilters = !this.showFilters;
	}

	public checkSortable(type: string) {
		return this.Columns.sortable_types.some((sort_type: string): boolean => {
			return sort_type === type;
		});
	}

	public checkSearchable(type: string) {
		return this.Columns.searchable_types.some((sort_type: string): boolean => {
			return sort_type === type;
		});
	}

	public turnSort(column: any, direction: "ascending" | "descending") {
		column.filters[direction] = !column.filters[direction];

		column.filters[direction === "ascending" ? "descending" : "ascending"] =
			false;
	}

	// Refresh
	public refreshEmit(): void {
		this.Refresh.emit();
	}

	public clickTable(id: string) {
		const input = document.getElementById(id);
		input?.focus();
	}

	// Edit
	public editValue(
		index: number,
		column_name: string,
		editable: boolean,
		column?: any,
	): void {
		if (editable) {
			this.content()[index][column_name].active =
				!this.content()[index][column_name].active;
			this.previous_value = this.content()[index][column_name].value;
		}
	}

	public rowExpand(
		index: number,
		column_name: string,
		editable: boolean,
		column?: any,
	) {
		if (column_name === "retry_process_response") {
			column.short = !column.short;
			this.firstHundredChar(column["retry_process_response"], column.short);
		}
	}

	public submitEdit(
		id: number,
		column_name: string,
		index: number,
		value: any,
		column?: any,
	) {
		this.content()[index][column_name].active =
			!this.content()[index][column_name].active;
		this.InlineEditAction.emit({
			id: id,
			column: column_name,
			value: value,
			editable_columns: this.editable_columns(),
		});
		column.row_loading = true;
	}

	public focus() {
		//console.log("FOCUS");
	}

	public editableFieldBlur(
		event: FocusEvent,
		index: number,
		column_name: string,
	) {
		const nextElement = event.relatedTarget as HTMLImageElement;
		// If the next element is the check IMG, do not call cancelEdit
		if (nextElement && nextElement.alt === "check") {
			return;
		}
		this.cancelEdit(index, column_name);
	}

	public cancelEdit(index: number, column_name: string) {
		this.content()[index][column_name].value = this.previous_value;
		this.content()[index][column_name].active =
			!this.content()[index][column_name].active;
		return;
	}

	public changeRoleColumns(
		index: number,
		column_name: string,
		editable: boolean,
	) {
		if (editable) {
			this.content()[index][column_name].active =
				!this.content()[index][column_name].active;
		}
		this.ChangeRoleColumns.emit();
	}

	public firstHundredChar(text: string, active: boolean) {
		if (active) {
			let str = text.toString();
			if (str.length <= 100) {
				return str;
			} else {
				return str.substring(0, 100) + "...";
			}
		} else {
			return text;
		}
	}

	public blankActive(column: any) {
		column.filters.start = "";
		column.filters.end = "";
		column.filters.search = "";
		column.filters.not_blank = false;
		column.filters.is_exact = "";
	}

	public notBlankActive(column: any) {
		column.filters.start = "";
		column.filters.end = "";
		column.filters.search = "";
		column.filters.blank = false;
		column.filters.is_exact = "";
	}

	public exactActive(column: any) {
		column.filters.blank = "";
		column.filters.not_blank = "";
	}

	// Action
	public async action(column: any, id: number) {
		await this.Action.emit({ column: column.id, id: id });
	}

	public toggleSwitch(value: { id: number; column: string; value: boolean }) {
		value.value = !value.value;
		this.Toggle_Switch.emit(value);
	}

	// Record History
	public recordHistory(id: number) {
		this.RecordHistory.emit(id);
	}

	/** Pagination */
	public nextPage(): void {
		this.Next.emit();
	}

	public backPage(): void {
		this.Back.emit();
	}

	private autoScroll(id: string) {
		let table = document.getElementById("table");
		if (table) {
			let left = this.click_position() + 120;
			setTimeout(() => {
				table!.scrollTo({
					left: left,
					behavior: "smooth",
				});
			}, 1000);
		}
	}

	public cellHasBeenModified(itemID: number, columnName: string) {
		let has_been_modified = false;
		const changed = this.Record_History_Data_Changes.find(
			(c) => c["id"] == itemID,
		);
		if (changed) {
			has_been_modified = changed["_differences"].includes(columnName);
		}
		return has_been_modified;
	}

	protected readonly dateFormat = dateFormat;
	protected readonly dateTimeFormat = dateTimeFormat;
	protected readonly numberFormat = numberFormat;
}
