export interface student {
	id?: string | null;
	name?: string | null;
	groupId?: string | null;
	password?: string | null;
	avatar?: string | null;
	contact?: any | null;
	isActive?: boolean | null;
	profile?: any | null;
}

export interface studentInitialProperties {
	onProceed: Function;
	onClose: Function;
	initialStudent?: student;
	gradeId?: string;
}

export interface userMutationVariables {
	[x: string]: any;
}

export interface StudentState extends student {
	error: String;
}
