import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => res.status(200).send("Working"));
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	return res.status(500).json({ message: err.message });
	next();
});

export default app;
