// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
// https://github.com/vercel/next.js/blob/canary/examples/api-routes-cors/lib/init-middleware.js

import { NextApiRequest, NextApiResponse } from "next";

export default function initMiddleware(middleware: Function) {
	return (req: NextApiRequest, res: NextApiResponse) => {
		new Promise((resolve, reject) => {
			middleware(req, res, (result: unknown) => {
				if (result instanceof Error) {
					return reject(result);
				}
				return resolve(result);
			});
		});
	};
}
