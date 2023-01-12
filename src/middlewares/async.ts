import { NextFunction, Request, Response } from "express";

export default async function asyncWrapper(fn: any) {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await fn(req, res, next);
		} catch (err) {
			next(err);
		}
	};
}
