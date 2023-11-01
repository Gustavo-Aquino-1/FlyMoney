import "dotenv/config";
import IPayload from "../interfaces/IPayload";
import jwt, { SignOptions } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const secret = process.env.JWT_SECRET || "buedrf0hn8i435+gh890nj0945g";

const sign = (payload: IPayload, expiresIn = "5d") => {
	const jwtConfig: SignOptions = {
		algorithm: "HS256",
		expiresIn,
	};

	return jwt.sign(payload, secret, jwtConfig);
};

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.header("Authorization");
		const decoded = jwt.verify(token || "", secret);
		res.locals.user = decoded;
		next();
	} catch (error) {
		next(error);
	}
};

export { sign, verifyToken };
