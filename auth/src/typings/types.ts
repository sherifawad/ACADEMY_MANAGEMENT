import { User } from "./interface";

export type Gen<T> = {
	[Key in keyof T]?: T[Key];
};
export type TType<T> = {
	[Key in keyof T]: T;
};

export type Res<T> = {
	[Key in keyof T]: (val: T[Key]) => string;
};

export type Re<T> = {
	[Key in keyof T]: Partial<Record<keyof T, T[Key]>>;
};

export type CredentialsRegisterInputs = {
	user_password: string;
	provider: string;
	providerAccountId: string;
	type: string;
	user_data: User;
};
export type CredentialsLoginsInputs = {
	user_password: string;
	email: string;
	provider: string;
	providerAccountId: string;
	type: string;
};
export type AccountLoginsInputs = {
	providerAccountId: string;
	provider: string;
	email: string;
	name: string;
	image: string;
};
export type AccountRegisterInputs = {
	email: string;
	provider: string;
	providerAccountId: string;
	name: string;
	image: string;
	userId: string;
	type: string;
	token_type?: string;
	scope?: string;
};
