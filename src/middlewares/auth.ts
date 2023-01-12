import { NextFunction, Request, Response } from "express";

export default function auth(req: Request, res: Response, next: NextFunction) {
	if (req.session.user) return next();

	req.flash("errors", ["Você precisa fazer login antes"]);
	req.session.save(() => res.redirect("/login"));
}
