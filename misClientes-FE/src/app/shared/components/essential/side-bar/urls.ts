import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class Urls {
	public user_links: string[] = [];
	public pages_urls: { id: string; url: string; icon: string }[] = [
		{
			id: "agent_management",
			url: "layout/agent-management",
			icon: "assets/img/sidebar/CRM.svg",
		},
		// EXCESS
		{
			id: "excess",
			url: "",
			icon: "assets/img/sidebar/icons/excess.svg",
		},
		{
			id: "excess_agent_report",
			url: "excess/agent-report",
			icon: "",
		},
		{
			id: "excess_enrollments",
			url: "excess/online-enrollments",
			icon: "",
		},
		// Whoop
		{
			id: "whoop",
			url: "",
			icon: "assets/img/sidebar/icons/whoop.svg",
		},
		{
			id: "whoop_agent_report",
			url: "whoop/agent-report",
			icon: "",
		},
		{
			id: "whoop_enrollments",
			url: "whoop/online-enrollments",
			icon: "",
		},
		// IPC
		{
			id: "ipc",
			url: "",
			icon: "assets/img/sidebar/icons/wireless-now.svg",
		},
		{
			id: "ipc_agent_report",
			url: "ipc/agent-report",
			icon: "",
		},
		{
			id: "ipc_enrollments",
			url: "ipc/online-enrollments",
			icon: "",
		},
		// Angel Mobile
		{
			id: "amb",
			url: "",
			icon: "assets/img/sidebar/icons/angel-mobile.svg",
		},
		{
			id: "amb_agent_report",
			url: "amb/agent-report",
			icon: "",
		},
		{
			id: "amb_enrollments",
			url: "amb/online-enrollments",
			icon: "",
		},
	];
}
