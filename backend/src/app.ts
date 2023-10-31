import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./router";

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	return res.status(500).json({
		message: err.name.includes("Sequelize")
			? err.errors[0].message
			: err.message,
	});
	next();
});

export default app;
