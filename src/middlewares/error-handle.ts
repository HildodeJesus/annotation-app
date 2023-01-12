import { NextFunction, Request, Response } from "express";
import { CustomError } from "../error/custom-error";

export default function errorHandle(
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (err instanceof CustomError) {
		return res.render("error", { code: err.statusCode, message: err.message });
	}

	console.log(err);

	return res.render("error", {
		code: 500,
		message: "Aconteceu algum erro, tente novamente",
	});
}
