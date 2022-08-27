import Express from "express";
import {
	accessTokenController,
	loginController,
	registerController
} from "../controllers/userController";
import authenticationMiddleware from "../middlewares/authenticaionMiddleware";
export const authRouter = Express.Router();

authRouter.get("/", (_req, res): void => {
	res.status(200).json("Main Auth");
});

authRouter.post("/login", loginController);
authRouter.post("/register", registerController);
authRouter.post(
	"/accesstoken",
	authenticationMiddleware,
	accessTokenController
);

// orderRouter.get(
// 	"/:order_id",
// 	orderEditValidator,
// 	validatorMiddleWare,
// 	orderViewController
// );
