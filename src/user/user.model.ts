import { ESex } from "src/share/type";

export interface User {
    id: string;
	login: string;
	email: string;
	full_name: string;
	sex: ESex;
	password: string;
	date_birth: string;
	date_create: string;
	date_modify: string;
	date_hire: string;
	date_fire?: string;
}