import { EventEmitter, Injectable, Output } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class LoginData {
	public user_data: any = {};
}
