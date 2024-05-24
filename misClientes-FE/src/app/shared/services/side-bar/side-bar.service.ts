import { inject, Injectable, signal } from "@angular/core";
import { HttpService } from "../../../core/http/http-service";

@Injectable({
	providedIn: "root",
})
export class SideBarService {
	private HttpService = inject(HttpService);
	private url = signal("sidebar");

	getAll() {
		return this.HttpService.get(this.url());
	}
}
