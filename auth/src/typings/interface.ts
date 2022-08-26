import { Request, Response } from "express";

export interface User {
	id: string;
	email?: string | null;
	name: string | null;
	image?: string | null;
	isActive?: boolean | null;
	isAdmin?: boolean | null;
	emailVerified?: Date | null;
}
export interface Account {
	id: string;
	userId: string;
	type: string;
	provider: string;
	providerAccountId: string;
	refresh_token?: string;
	access_token?: string;
	expires_at?: number;
	token_type?: string;
	scope?: string;
	id_token?: string;
}

export interface Context {
	request: Request;
	response: Response;
}
