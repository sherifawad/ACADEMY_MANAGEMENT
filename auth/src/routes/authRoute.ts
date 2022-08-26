import Express from "express";
const authRouter = Express.Router();

authRouter.post("/login", authController);

// orderRouter.get(
// 	"/:order_id",
// 	orderEditValidator,
// 	validatorMiddleWare,
// 	orderViewController
// );