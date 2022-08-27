import { Request, Response } from "express";
import prisma from "../../lib/prisma";
import { providerTypes } from "../core/constants";
import {
	handleCredentialProviderLogin,
	handleCredentialProviderRegister
} from "../services/creditialsProviderService";
import {
	handleUserAccountLogin,
	handleUserAccountRegister
} from "../services/userAcountsService";

import { User } from "../typings/interface";
import { createAccessToken, createTokens } from "../utils/auth";

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
		const {
			name,
			email,
			password,
			image,
			provider,
			providerAccountId,
			type
		} = req.body;

		let result;
		if (password) {
			result = await handleCredentialProviderLogin({
				user_password: password,
				email,
				provider,
				providerAccountId,
				type
			});
		} else {
			result = await handleUserAccountLogin({
				email,
				name,
				image,
				provider,
				providerAccountId
			});
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
			name,
			email,
			password,
			image,
			provider,
			providerAccountId,
			token_type,
			scope,
			type
		} = req.body;

		let result;
		if (password) {
			result = await handleCredentialProviderRegister({
				user_password: password,
				provider,
				providerAccountId,
				type,
				user_data: { id: userId, name, email, image }
			});
		} else {
			result = await handleUserAccountRegister({
				email,
				provider,
				providerAccountId,
				name,
				image,
				userId,
				type,
				token_type,
				scope
			});
		}
		console.log("🚀 ~ file: userController.ts ~ line 104 ~ result", result);
		return res.status(201).json({
			status: 201,
			message: "Registered Successfully",
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
export const accessTokenController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { provider, providerAccountId, refreshToken } = req.body;

		const account = await prisma.account.findUniqueOrThrow({
			where: {
				provider_providerAccountId: {
					provider,
					providerAccountId
				}
			},
			include: { user: true }
		});

		const { refresh_token, expires_at, user } = account;
		if (
			Math.floor(Date.now() / 1000) <= (expires_at as number) &&
			refresh_token === refreshToken
		) {
			const token = createAccessToken(user);
			return res.status(201).json({
				status: 201,
				message: "Registered Successfully",
				...token
			});
		}
		throw new Error("Not Allowed");
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
