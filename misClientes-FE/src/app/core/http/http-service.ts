import { inject, Injectable } from "@angular/core";

import { environment } from "../../environments/environment";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { AuthToken } from "../local-storage/types/auth-token.type";
import { ErrorHandlerService } from "../error-handler/error-handler.service";
import { Router } from "@angular/router";

export interface SHResponse<T> {
	msg: string;
	data: T;
}

@Injectable({
	providedIn: "root",
})
export class HttpService {
	private LocalStorageService = inject(LocalStorageService);
	private ErrorHandlerService = inject(ErrorHandlerService);

	private router: Router = inject(Router);

	private baseUrl = environment.backend_url;

	public addAuthorizationHeader(config: AxiosRequestConfig) {
		const token = this.LocalStorageService.getItem<AuthToken>("authToken");
		const exp = this.LocalStorageService.getItem<AuthToken>("exp");

		let new_config = config;

		if (token && exp) {
			if (Date.now() >= +exp * 1000) {
				console.log("Token expired! time to renew");
			} else {
				new_config = Object.assign(new_config, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
			}
		}
		return new_config;
	}

	public handleError = async (error: AxiosError): Promise<any> => {
		console.log(error, "⛔️⛔️⛔️⛔️⛔️⛔️⛔️");
		if (error.response?.status === 401) {
			localStorage.clear();
			await this.router.navigate(["/login"]);
		}
		return error;
	};

	public get<T>(url: string, config?: AxiosRequestConfig) {
		if (this.LocalStorageService.getItem<AuthToken>("authToken")) {
			const requestConfig: AxiosRequestConfig = this.addAuthorizationHeader({
				...config,
				method: "get",
				url: this.baseUrl + url,
			});

			return axios
				.request<T>(requestConfig)
				.then((response: AxiosResponse<any>) => response.data);
			// .catch(async (e: AxiosError) => {
			// 	await this.handleError(e);
			// 	return e;
			// });
		} else {
			return;
		}
	}

	public post<T>(
		url: string,
		data?: any,
		config?: AxiosRequestConfig,
	): Promise<T> {
		const requestConfig: AxiosRequestConfig = this.addAuthorizationHeader({
			...config,
			method: "post",
			url: this.baseUrl + url,
			data,
		});

		return axios
			.request<T>(requestConfig)
			.then((response: AxiosResponse<any>) => response.data);
	}

	public put<T>(
		url: string,
		data?: any,
		config?: AxiosRequestConfig,
	): Promise<T> {
		const requestConfig: AxiosRequestConfig = this.addAuthorizationHeader({
			...config,
			method: "put",
			url: this.baseUrl + url,
			data,
		});

		return axios
			.request<T>(requestConfig)
			.then((response: AxiosResponse<any>) => response.data);
	}

	public patch<T>(
		url: string,
		data?: any,
		config?: AxiosRequestConfig,
	): Promise<T> {
		const requestConfig: AxiosRequestConfig = this.addAuthorizationHeader({
			...config,
			method: "patch",
			url: this.baseUrl + url,
			data,
		});

		return axios
			.request<T>(requestConfig)
			.then((response: AxiosResponse<any>) => response.data);
	}

	public delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
		const requestConfig: AxiosRequestConfig = this.addAuthorizationHeader({
			...config,
			method: "delete",
			url: this.baseUrl + url,
		});

		return axios
			.request<T>(requestConfig)
			.then((response: AxiosResponse<T>) => response.data);
	}

	// No token required
	public async unauthenticatedPost<T>(
		url: string,
		data?: any,
		config?: AxiosRequestConfig,
	): Promise<T> {
		const request_config: AxiosRequestConfig = {
			...config,
			method: "post",
			url: this.baseUrl + url,
			data: data,
		};

		return axios.request(request_config);
	}
}
