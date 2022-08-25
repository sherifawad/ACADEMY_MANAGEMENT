export interface User {
	user_id: string | number;
	user_email: string;
	user_role: Role;
	user_active: boolean;
	user_name: string;
	user_password: string;
}

enum Role {
	ADMIN,
	USER,
	STUDENT
}
