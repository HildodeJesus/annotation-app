import { NextFunction, Request, Response } from "express";

function variableGlobal(req: Request, res: Response, next: NextFunction) {
	res.locals.success = req.flash("success");
	res.locals.errors = req.flash("errors");
	res.locals.user = req.session.user;
	next();
}

export default variableGlobal;
