import { inject, Injectable, signal, WritableSignal } from "@angular/core";
import { HttpService } from "../../../core/http/http-service";
import { Column } from "../../../features/layout/excess/online-enrollments/online-enrollments.component";

@Injectable({
	providedIn: "root",
})
export class AgentManagementService {
	private HttpService: HttpService = inject(HttpService);
	private Table: WritableSignal<string> = signal<string>("agent-management");

	async getTableData(params?: Object): Promise<any> {
		return this.HttpService.get(this.Table(), params);
	}

	async getRolesList(): Promise<any> {
		return this.HttpService.get(this.Table() + "/roles");
	}

	async changeRole(
		id: number,
		body: {
			role_id: number;
		},
	): Promise<any> {
		return this.HttpService.patch(this.Table() + "/" + id + "/role", body);
	}

	async switchAccount(id: number, turn: "enable" | "disable") {
		return this.HttpService.patch(this.Table() + "/" + id + "/" + turn);
	}

	async changePassword(id: number, password: string) {
		let body = {
			password: password,
		};
		return this.HttpService.patch(this.Table() + "/" + id + "/password", body);
	}

	async updateTeam(
		id: number,
		body: {
			team: string;
		},
	): Promise<any> {
		return this.HttpService.patch(this.Table() + "/" + id + "/team", body);
	}
}
