import { inject, Injectable, signal, WritableSignal } from "@angular/core";
import { HttpService } from "../../../core/http/http-service";

@Injectable({
	providedIn: "root",
})
export class LoginService {
	private HttpService: HttpService = inject(HttpService);
	private Table: WritableSignal<string> = signal<string>("profile");

	async getProfile(): Promise<any> {
		return this.HttpService.get(this.Table());
	}
}