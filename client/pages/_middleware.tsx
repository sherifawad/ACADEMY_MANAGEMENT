import Paths from "core/paths";
import { user } from "features/userFeature/userTypes";
import { withAuth } from "next-auth/middleware";

export default withAuth(
	// `withAuth` augments your `Request` with the user's token.
	function middleware(req) {
		// console.log(req.nextauth.token);
	},
	{
		callbacks: {
			// authorized: ({ token }) => token?.role === "admin",
			authorized: ({ token, req }) => {
				const { user } = token || ({} as any);
				const { id, role } = (user as user) || {};
				const { name, params } = req?.page || {};
				if (!role || !name) {
					return false;
				}

				switch (role) {
					case "ADMIN":
						return true;
					case "USER": {
						if (name !== "/user/[userId]") return true;
						if (params?.userId === id) return true;
						return false;
					}
					case "Student": {
						if (!name.startsWith("/student")) return false;
						if (params?.studentId === id) return true;
						return false;
					}

					default:
						return false;
				}

				// (token ? true : false)
			},
		},
		pages: {
			signIn: Paths.SignIn,
		},
	}
);

// export const config = { matcher: ["/admin"] };
