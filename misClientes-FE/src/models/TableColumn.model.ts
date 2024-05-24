export interface Column {
	id: string;
	type: string;
	order: number;
	name_pretty: string;
	is_sortable: boolean;
	is_filterable: boolean;
	is_date: boolean;
	values: string | null;
}

