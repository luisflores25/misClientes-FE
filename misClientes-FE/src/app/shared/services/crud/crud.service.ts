import { environment } from "../../../environments/environment";
import axios from "axios";

export class CRUD {
	async get(table_name: string, token: boolean, params?: any) {
		if (params && token) {
			return await axios.get(environment.backend_url + table_name, {
				params,
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
		} else if (params && !token) {
			return await axios.get(environment.backend_url + table_name, { params });
		} else {
			return await axios.get(environment.backend_url + table_name, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
		}
	}

	async post(table_name: string, body: object, extra_data?: string | null) {
		if (extra_data) {
			return await axios.post(
				environment.backend_url + table_name + `/${extra_data}`,
				body,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				},
			);
		} else
			return await axios.post(environment.backend_url + table_name, body, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
	}

	async put(
		table_name: string,
		id: string | number,
		body: object | null,
		extra_data?: string | null,
	) {
		if (extra_data && id) {
			return await axios.put(
				environment.backend_url + table_name + `/${id}` + `/${extra_data}`,
				body,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				},
			);
		} else if (id) {
			return await axios.put(
				environment.backend_url + table_name + `/${id}`,
				body,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				},
			);
		} else {
			return await axios.put(environment.backend_url + table_name, body);
		}
	}

	async patch(
		table_name: string,
		id: string | number,
		body: object | null,
		extra_data?: string | null,
	) {
		if (extra_data) {
			return await axios.patch(
				environment.backend_url + table_name + `/${id}` + `/${extra_data}`,
				body,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				},
			);
		} else
			return await axios.put(environment.backend_url + table_name, body, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
	}

	async delete(table_name: string, extra_data?: string | null, params?: any) {
		if (extra_data) {
			return await axios.delete(
				environment.backend_url + table_name + `/${extra_data}`,
			);
		} else return await axios.delete(environment.backend_url + table_name);
	}
}
