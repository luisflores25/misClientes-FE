import { inject, Injectable, signal, WritableSignal } from "@angular/core";
import { HttpService } from "../../../core/http/http-service";
import { Column } from "../../../features/layout/excess/online-enrollments/online-enrollments.component";
import { Brand } from "src/app/types/custom-types";

@Injectable({
	providedIn: "root",
})
export class AgentReportService {
	private HttpService: HttpService = inject(HttpService);
	private Table: WritableSignal<string> = signal<string>("agent-report");

	async getTableData(brand: Brand, params?: Object): Promise<any> {
		return this.HttpService.get(this.Table() + "/" + brand, params);
	}

	async getCardsData(brand: Brand, params?: Object): Promise<any> {
		return this.HttpService.get(this.Table() + "/" + brand + "/cards", params);
	}
}
