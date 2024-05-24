import { Injectable } from "@angular/core";


@Injectable({
	providedIn: "root",
})
export class ViajesManagementColumns {
	public Columns = {
		columns: [
			{
				id: "full_name",
				is_editable: false,
				name_pretty: "Name",
				order: 20,
				type: "string",
				values: null,
			},
			{
				id: "email_address",
				is_editable: false,
				name_pretty: "Email",
				order: 10,
				type: "string",
				values: null,
			},
			{
				id: "team",
				is_editable: true,
				name_pretty: "Team",
				order: 40,
				type: "enum",
				values: [
					{
						name: "mx",
						value: "mx",
					},
					{
						name: "va",
						value: "va",
					},
				],
			},
			{
				id: "role",
				is_editable: true,
				name_pretty: "Role",
				order: 50,
				type: "enum",
				values: null,
			},
			{
				id: "change_password",
				is_editable: false,
				name_pretty: "Change password",
				order: 60,
				type: "action",
				values: null,
			},
			{
				id: "created_at",
				is_editable: false,
				name_pretty: "Registration date",
				order: 70,
				type: "timestamp",
				values: null,
			},
			{
				id: "is_enabled",
				is_editable: true,
				name_pretty: "Active",
				order: 80,
				type: "boolean",
				values: null,
			},
		],
		searchable_types: ["string", "enum"],
		sortable_types: ["string", "enum", "date", "number"],
		filters: [],
	};
}
