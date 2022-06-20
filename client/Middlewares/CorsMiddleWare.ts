import Cors from "cors";
import initMiddleware from "lib/init-middleware";

export const cors = initMiddleware(
	Cors({
		credentials: true,
		origin: ["https://studio.apollographql.com"],
	})
);
