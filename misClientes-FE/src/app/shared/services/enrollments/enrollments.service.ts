import { inject, Injectable, signal, WritableSignal } from "@angular/core";
import { HttpService } from "../../../core/http/http-service";
import { Column } from "../../../features/layout/excess/online-enrollments/online-enrollments.component";
import axios, { AxiosRequestConfig, CancelTokenSource } from "axios";
import { CardsV2Response } from "src/app/types/custom-types";
import { ChangeProgram } from "src/models/ChangeProgram/change-program.model";
import { Brand } from "src/app/types/custom-types";
@Injectable({
	providedIn: "root",
})
export class EnrollmentsService {
	private HttpService: HttpService = inject(HttpService);
	private Table: WritableSignal<string> = signal<string>("enrollments");

	// Tokens
	private cancelTokenSource: CancelTokenSource;
	constructor() {
		this.cancelTokenSource = axios.CancelToken.source();
	}
	public cancelTableCountRequest(): void {
		this.cancelTokenSource.cancel(
			"Solicitud getTableCount cancelada por el usuario",
		);
		this.cancelTokenSource = axios.CancelToken.source(); // Restablece la fuente de cancelación
	}

	private addCancelTokenToConfig(params?: Object): AxiosRequestConfig {
		return {
			...params,
			cancelToken: this.cancelTokenSource.token,
		};
	}
	public cancelRequest(): void {
		this.cancelTokenSource.cancel("Solicitud cancelada por el usuario");
		this.cancelTokenSource = axios.CancelToken.source(); // Restablece la fuente de cancelación
	}

	// Enrollments Services
	async getColumns(brand: Brand): Promise<{ msg: string; data: Column[] }> {
		return this.HttpService.get(this.Table() + "/" + brand + "/columns");
	}

	async getColumnsV2(brand: Brand): Promise<{ msg: string; data: Column[] }> {
		return this.HttpService.get(this.Table() + "/v2/" + brand + "/columns");
	}

	public async getTableCount(brand: Brand, params?: Object): Promise<any> {
		const url = this.Table() + "/" + brand + "/count";
		const requestConfig: AxiosRequestConfig =
			this.addCancelTokenToConfig(params);

		try {
			const response: any = await this.HttpService.get(url, requestConfig);
			return response;
		} catch (error: any) {
			if (axios.isCancel(error)) {
				return Promise.reject("Count cancelled");
			} else {
				// Manejar otros errores
				return Promise.reject(error);
			}
		}
	}

	async getTableData(brand: Brand, params?: Object): Promise<any> {
		return this.HttpService.get(this.Table() + "/" + brand, params);
	}

	async getCardsDataV2(
		brand: Brand,
		params?: Object,
	): Promise<CardsV2Response> {
		return this.HttpService.get(
			this.Table() + "/" + brand + "/cards/v2",
			params,
		);
	}

	async getHistory(brand: Brand, id: number): Promise<any> {
		return this.HttpService.get(
			this.Table() + "/" + brand + "/" + id + "/history",
		);
	}

	async getLastSMS(brand: Brand, id: number): Promise<any> {
		return this.HttpService.get(
			this.Table() + "/" + brand + "/" + id + "/last-sms-sent",
		);
	}

	async getPaymentReceipt(brand: Brand, id: number): Promise<any> {
		return this.HttpService.get(
			this.Table() + "/" + brand + "/" + id + "/payment-receipt",
		);
	}

	async getAltPaymentProof(brand: Brand, id: number): Promise<any> {
		return this.HttpService.get(
			this.Table() + "/" + brand + "/" + id + "/alt-payment-proof",
		);
	}

	async updateEnrollment(
		brand: Brand,
		id: number,
		body: {
			name: string;
			value: string;
		},
	) {
		return this.HttpService.patch(this.Table() + "/" + brand + "/" + id, body);
	}

	async action(brand: Brand, id: number, action: string, body?: any) {
		return this.HttpService.patch(
			this.Table() + "/" + brand + "/actions/" + id + "/" + action,
			body,
		);
	}
	async actionGet(brand: Brand, id: number, action: string, body?: any) {
		return this.HttpService.get(
			this.Table() + "/" + brand + "/actions/" + id + "/" + action,
			body,
		);
	}
}
