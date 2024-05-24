import { Injectable } from "@angular/core";
import { DateTime } from "luxon";

export type filters = {
	search: string;
	ascending: boolean;
	descending: boolean;
	column: string;
	start: string;
	end: string;
	blank: boolean;
	not_blank: boolean;
	is_exact: boolean;
};

@Injectable({
	providedIn: "root",
})
export class filtersFormat {
	public format(filters: filters[]) {
		let params: any = {};
		for (let filter of filters) {
			if (filter.ascending || filter.descending) {
				params = Object.assign(params, {
					sort_by: filter.column,
					sort_dir: filter.ascending ? "asc" : "desc",
				});
			}

			if (filter.search) {
				let q = `q[${filter.column}]`;
				params = Object.assign(params, {
					[q]: filter.search,
				});
			}

			if (filter.start) {
				let q = `range[${filter.column}][start]`;

				params = Object.assign(params, {
					[q]: DateTime.fromSQL(filter.start + " 00:00:00", {
						zone: "America/Los_Angeles",
					})
						.setZone("utc")
						.toFormat("yyyy-MM-dd HH:mm:ss"),
				});
			}

			if (filter.end) {
				let q = `range[${filter.column}][end]`;
				params = Object.assign(params, {
					[q]: DateTime.fromSQL(filter.end + " 23:59:59", {
						zone: "America/Los_Angeles",
					})
						.setZone("utc")
						.toFormat("yyyy-MM-dd HH:mm:ss"),
				});
			}

			if (filter.blank) {
				if (params.blank) {
					params.blank = params.blank + `,${filter.column}`;
				} else {
					params = Object.assign(params, {
						blank: filter.column,
					});
				}
			}

			if (filter.not_blank) {
				if (params.not_blank) {
					params.not_blank = params.not_blank + `,${filter.column}`;
				} else {
					params = Object.assign(params, {
						not_blank: filter.column,
					});
				}
			}

			if (filter.is_exact) {
				if (params.is_exact) {
					params.is_exact = params.is_exact + `,${filter.column}`;
				} else {
					params = Object.assign(params, {
						is_exact: filter.column,
					});
				}
			}
		}
		return {
			params: params,
		};
	}

	public addFilterChips(active_filters: any[], column: any, position: number) {
		let search_repeated = active_filters.findIndex((filter) => {
			return filter.type === column.name_pretty + "_search";
		});
		let blank_repeated = active_filters.findIndex((filter) => {
			return filter.type === column.name_pretty + "_blank";
		});
		let not_blank_repeated = active_filters.findIndex((filter) => {
			return filter.type === column.name_pretty + "_not_blank";
		});
		let ascending_descending_repeated = active_filters.findIndex((filter) => {
			return filter.type === "ascending_descending";
		});
		let start_repeated = active_filters.findIndex((filter) => {
			return filter.type === column.name_pretty + "_start";
		});
		let end_repeated = active_filters.findIndex((filter) => {
			return filter.type === column.name_pretty + "_end";
		});

		if (search_repeated === -1) {
			if (column.filters.search) {
				const value =
					column.filters.is_exact == true
						? "is " + column.filters.search
						: column.filters.search;
				active_filters.push({
					id: column.id,
					position: position,
					label: column.name_pretty,
					value: value,
					type: column.name_pretty + "_search",
					filters: column.filters,
				});
			}
		} else {
			if (column.filters.search) {
				active_filters[search_repeated].value =
					column.filters.is_exact == true
						? "is " + column.filters.search
						: column.filters.search;
			} else {
				active_filters.splice(search_repeated, 1);

				blank_repeated = active_filters.findIndex((filter) => {
					return filter.type === column.name_pretty + "_blank";
				});

				not_blank_repeated = active_filters.findIndex((filter) => {
					return filter.type === column.name_pretty + "_not_blank";
				});

				ascending_descending_repeated = active_filters.findIndex((filter) => {
					return filter.type === "ascending_descending";
				});

				start_repeated = active_filters.findIndex((filter) => {
					return filter.type === column.name_pretty + "_start";
				});

				end_repeated = active_filters.findIndex((filter) => {
					return filter.type === column.name_pretty + "_end";
				});
			}
		}

		if (blank_repeated === -1) {
			if (column.filters.blank) {
				active_filters.push({
					id: column.id,
					position: position,
					label: column.name_pretty,
					value: "Is Blank",
					type: column.name_pretty + "_blank",
					filters: column.filters,
				});
			}
		} else {
			if (column.filters.blank) {
				active_filters[blank_repeated].value = "Is Blank";
			} else {
				active_filters.splice(blank_repeated, 1);

				search_repeated = active_filters.findIndex((filter) => {
					return filter.type === column.name_pretty + "_search";
				});

				ascending_descending_repeated = active_filters.findIndex((filter) => {
					return filter.type === "ascending_descending";
				});

				start_repeated = active_filters.findIndex((filter) => {
					return filter.type === column.name_pretty + "_start";
				});

				end_repeated = active_filters.findIndex((filter) => {
					return filter.type === column.name_pretty + "_end";
				});
			}
		}

		if (not_blank_repeated === -1) {
			if (column.filters.not_blank) {
				active_filters.push({
					id: column.id,
					position: position,
					label: column.name_pretty,
					value: "Is Not Blank",
					type: column.name_pretty + "_not_blank",
					filters: column.filters,
				});
			}
		} else {
			if (column.filters.not_blank) {
				active_filters[not_blank_repeated].value = "Is Not Blank";
			} else {
				active_filters.splice(not_blank_repeated, 1);

				search_repeated = active_filters.findIndex((filter) => {
					return filter.type === column.name_pretty + "_search";
				});

				ascending_descending_repeated = active_filters.findIndex((filter) => {
					return filter.type === "ascending_descending";
				});

				start_repeated = active_filters.findIndex((filter) => {
					return filter.type === column.name_pretty + "_start";
				});

				end_repeated = active_filters.findIndex((filter) => {
					return filter.type === column.name_pretty + "_end";
				});
			}
		}

		if (ascending_descending_repeated === -1) {
			if (column.filters.ascending) {
				active_filters.push({
					id: column.id,
					position: position,
					label: column.name_pretty,
					value: "Ascending",
					type: "ascending_descending",
					filters: column.filters,
				});
			} else if (column.filters.descending) {
				active_filters.push({
					id: column.id,
					position: position,
					label: column.name_pretty,
					value: "Descending",
					type: "ascending_descending",
					filters: column.filters,
				});
			}
		} else {
			if (column.filters.ascending || column.filters.descending) {
				active_filters[ascending_descending_repeated].id = column.id;
				active_filters[ascending_descending_repeated].label =
					column.name_pretty;
				active_filters[ascending_descending_repeated].filters = column.filters;
				active_filters[ascending_descending_repeated].value = column.filters
					.ascending
					? "Ascending"
					: "Descending";
			}
		}
		if (start_repeated === -1) {
			if (column.filters.start) {
				active_filters.push({
					id: column.id,
					label: column.name_pretty + " from",
					value: column.filters.start.replaceAll("-", "/"),
					type: column.name_pretty + "_start",
					filters: column.filters,
				});
			}
		} else {
			active_filters[start_repeated].value = column.filters.start.replaceAll(
				"-",
				"/",
			);
		}
		if (end_repeated === -1) {
			if (column.filters.end) {
				active_filters.push({
					id: column.id,
					position: position,
					label: column.name_pretty + " to",
					value: column.filters.end.replaceAll("-", "/"),
					type: column.name_pretty + "_end",
					filters: column.filters,
				});
			}
		} else {
			active_filters[end_repeated].value = column.filters.end.replaceAll(
				"-",
				"/",
			);
		}
		return active_filters;
	}
}
