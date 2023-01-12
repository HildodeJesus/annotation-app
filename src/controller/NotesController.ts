import { NextFunction, Request, Response } from "express";

import NoteRepo from "../repositories/NoteRepo";

class NotesController {
	async showNote(req: Request, res: Response, next: NextFunction) {
		const noteId = req.params.id;
		try {
			const noteRepo = new NoteRepo();
			const note = await noteRepo.getNoteById(noteId);

			res.render("note", { note });
		} catch (err) {
			next(err);
		}
	}

	async notesSave(req: Request, res: Response, next: NextFunction) {
		const { title, content, userId, checked } = req.body;
		const noteId = req.params.noteId || null;

		try {
			const noteRepo = new NoteRepo({
				title,
				content,
				userId,
				checked: checked == undefined ? false : true,
			});

			if (noteId == null) {
				await noteRepo.create();
			} else {
				noteRepo.update(noteId);
			}

			if (noteRepo.errors.length > 0) {
				req.flash("errors", noteRepo.errors);
				req.session.save(() => res.redirect("back"));
				return;
			}

			req.flash("success", "Salvo com sucesso!");
			req.session.save(() => res.redirect("back"));
			return;
		} catch (err) {
			next(err);
		}
	}

	async notesDelete(req: Request, res: Response, next: NextFunction) {
		const noteId = req.params.noteId;
		try {
			const noteRepo = new NoteRepo();
			await noteRepo.delete(noteId);

			if (noteRepo.errors.length > 0) {
				req.flash("errors", noteRepo.errors);
				req.session.save(() => res.redirect("back"));
				return;
			}

			req.flash("success", "Anotação foi deletada");
			req.session.save(() => res.redirect("/"));
			return;
		} catch (err) {
			next(err);
		}
	}
}

export default new NotesController();
