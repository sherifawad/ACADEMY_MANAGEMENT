export interface user {
	id?: string | null;
	roleId?: number | null;
	name?: string | null;
	groupId?: string | null;
	password?: string | null;
	avatar?: string | null;
	contact?: any | null;
	isActive?: boolean | null;
	profile?: any | null;
	family?: any | null;
}

export interface userInitialProperties {
	onProceed: Function;
	onClose: Function;
	initialUser?: user;
	gradeId?: string;
	roleId?: number;
	isStudent?: boolean;
}

export interface userVariables {
	[x: string]: any;
}

export interface StudentState extends user {
	error: String;
}
