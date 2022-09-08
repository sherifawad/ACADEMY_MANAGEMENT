export interface Role {
	id: number;
	name: string;
	description: string;
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
