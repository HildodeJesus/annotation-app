import { NextFunction, Request, Response } from "express";
import NoteRepo from "../repositories/NoteRepo";

class HomeController {
	async index(req: Request, res: Response, next: NextFunction) {
		const notePage = Number(req.query.notePage) || 1;
		const hglPage = Number(req.query.hglPage) || 1;

		let noteForATime = 8;
		let hglForATime = 4;

		try {
			const userId = req.session.user.id;

			const noteRepo = new NoteRepo();

			const notes = await noteRepo.getUserNotes(userId, {
				limit: notePage * noteForATime,
			});
			const highlight = await noteRepo.getUserHighlight(userId, {
				limit: hglPage * hglForATime,
			});

			return res.render("home", {
				notes: notes,
				highlight: highlight,
				hasHighlight: hglForATime * hglPage < highlight.count,
				hasNotes: noteForATime * notePage < notes.count,
				nextNotePage: notePage + 1,
				nextHglPage: hglPage + 1,
			});
		} catch (err) {
			next(err);
		}
	}
}

export default new HomeController();
