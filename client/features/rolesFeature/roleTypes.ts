export interface Role {
	id: number;
	name: string;
	description: string;
}
export interface Domain {
	id: number;
	name: string;
	description: string;
}
export interface Permission {
	id: number;
	name: string;
	description: string;
}

export interface PermissionInitials {
	Permissions: Permission[];
	onProceed: Function;
	onClose: Function;
}

export interface DomainInitials {
	domains: Domain[];
	onProceed: Function;
	onClose: Function;
}

export interface RoleInitials extends Role {
	onProceed: Function;
	onClose: Function;
}

export interface roleVariables {
	[x: string]: any;
}

export interface RoleState extends Role {
	error: String;
}
