import { inject, Injectable } from "@angular/core";

import { LocalStorageService } from "../local-storage/local-storage.service";
import { HttpService, SHResponse } from "../http/http-service";

import { AuthToken } from "../local-storage/types/auth-token.type";
import { Router } from "@angular/router";

export interface LoginRequestBody {
	email_address: string;
	password: string;
}

export interface SignUpRequestBody {
	first_name: string;
	last_name: string;
	gender: string;
	dob: string;
	email_address: string;
	password: string;
	username: string;
}

export interface LoginResponseBody {
	msg: string;
	data: {
		user_id: number;
		user_email_address: string;
		user_full_name: string;
		jwt: string;
	};
}

export interface SignUpRequestBody {}

@Injectable({
	providedIn: "root",
})
export class AuthService {
	private router = inject(Router);

	constructor(
		private local_storage_service: LocalStorageService,
		private http_service: HttpService,
	) {}

	public getTokenExpirationTime() {
		return this.local_storage_service.getItem("exp");
	}

	public handleTokenExpiration(): void {
		const tokenExpirationTime: any = this.getTokenExpirationTime();
		if (tokenExpirationTime) {
			if (Date.now() >= +tokenExpirationTime * 1000) {
				this.logout();
			}
		} else {
			this.logout();
		}
	}

	private clearAuthToken(): void {
		this.local_storage_service.removeItem("exp");
		this.local_storage_service.removeItem("authToken");
	}

	public isLoggedIn() {
		const authToken = this.local_storage_service.getItem<AuthToken>("token");

		return authToken?.token !== undefined;
	}

	public login(data: LoginRequestBody) {
		return this.http_service.unauthenticatedPost<
			Promise<SHResponse<LoginResponseBody>>
		>("auth/login", data);
	}

	public signup(data: SignUpRequestBody) {
		return this.http_service.unauthenticatedPost<
			Promise<SHResponse<SignUpRequestBody>>
		>("profile", data);
	}

	public signupAccount(data: SignUpRequestBody) {
		return this.http_service.unauthenticatedPost<
			Promise<SHResponse<SignUpRequestBody>>
		>("auth/sign-up", data);
	}

	public logout(): void {
		this.clearAuthToken();
		// Clear any other user-related data or session
		this.router.navigate(["/login"]);
	}

	// axios.interceptors.request.use(
	//   async (config) => {
	//     const token = // Get the token from the HTTP-only cookie or secure storage
	//     const tokenExpirationTime = // Get the token's expiration time

	//     // Check if the token is expired or about to expire (you may need some buffer time)
	//     if (token && tokenExpirationTime && tokenExpirationTime < Date.now() + 30000) {
	//       try {
	//         const newToken = await refreshToken();

	//         // Set the new token in the request header
	//         config.headers.Authorization = `Bearer ${newToken}`;
	//       } catch (error) {
	//         // Handle token refresh failure, e.g., logout the user and redirect to login page
	//         // ...
	//       }
	//     }

	//     return config;
	//   },
	//   (error) => Promise.reject(error)
	// );

	// @Injectable({
	//   providedIn: 'root'
	// })
	// export class LeadsService {
	//   private url: string = 'https://mkt-dashboard-api.sales-hub.com/leads';

	//   constructor(private toastService: ToastServiceService) {}

	//   async createLead(body: LeadsPostRequestBody): Promise<AxiosResponse<LeadsReponse>> {
	//     return await axios.post(this.url, body)
	//   }

	//   async updateLead(leadId: number, body: LeadsPatchRequestBody): Promise<AxiosResponse<LeadsReponse>> {
	//     return await axios.patch(this.url + `/${leadId}`, body)
	//   }
	// }
}
