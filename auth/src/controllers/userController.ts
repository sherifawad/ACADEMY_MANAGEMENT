import { Request, Response } from "express";
import prisma from "../../lib/prisma";
import { providerTypes } from "../core/constants";
import { handleCredentialProviderLogin } from "../services/creditialsProviderService";
import { handleUserAccountLogin } from "../services/userAcountsService";

import { User } from "../typings/interface";

/**
 *
 * @param req
 * @param res
 * @returns login result {user, accessToken, accessTokenExpireIn, refreshToken, refreshTokenExpireIn}
 */
export const loginController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { name, email, password, image, provider, providerAccountId } =
			req.body;
		const { type } = req.params;

		let result;
		if (password) {
			result = await handleCredentialProviderLogin(password, email);
		} else {
			result = handleUserAccountLogin(
				email,
				name,
				image,
				provider,
				providerAccountId
			);
		}
		return res.status(201).json({
			status: 201,
			message: "LoggedIn Successfully",
			...result
		});
	} catch (error) {
		// check if instance of error not throw string but => throw new Error("")
		if (error instanceof Error) {
			return res.status(400).json({
				message: error.stack
			});
		}
		// error is string
		return res.status(500).json({
			message: `${error}`
		});
	}
};

export const registerController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const {
			userId,
			role,
			name,
			email,
			password,
			image,
			provider,
			providerAccountId
		} = req.body;
		const { type } = req.params;

		let result;
		if (password) {
			result = await handleCredentialProviderLogin(password, email);
		} else {
			result = handleUserAccountLogin(
				email,
				name,
				image,
				provider,
				providerAccountId
			);
		}
		return res.status(201).json({
			status: 201,
			message: "LoggedIn Successfully",
			...result
		});
	} catch (error) {
		// check if instance of error not throw string but => throw new Error("")
		if (error instanceof Error) {
			return res.status(400).json({
				message: error.stack
			});
		}
		// error is string
		return res.status(500).json({
			message: `${error}`
		});
	}
};
