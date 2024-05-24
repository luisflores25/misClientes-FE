import { inject, Injectable, signal, WritableSignal } from "@angular/core";
import { HttpService } from "../../../core/http/http-service";

@Injectable({
	providedIn: "root",
})

export class ViajesManagementService { 
    private HttpService: HttpService = inject(HttpService);
	private Table: WritableSignal<string> = signal<string>("viajes");

    async getTableData(params?: Object): Promise<any> {
		return this.HttpService.get(this.Table(), params);
	}

    async getRutasDD(): Promise<any> {
		return this.HttpService.get("rutas");
	}
    async getUnidadesDD(): Promise<any> {
		return this.HttpService.get("unidades");
	}

    public createViaje(data: any) {
		return this.HttpService.post(this.Table(), data);
	}
}