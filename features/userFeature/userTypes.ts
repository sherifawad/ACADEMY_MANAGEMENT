import { User } from "@prisma/client";

export interface userInitialProperties {
	onProceed: Function;
	onClose: Function;
	initialUser?: User;
	gradeId?: string;
	roleId?: number;
	isStudent?: boolean;
}

export interface StudentState extends User {
	error: String;
}
