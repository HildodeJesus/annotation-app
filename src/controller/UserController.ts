import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";

import UserRepo from "../repositories/UserRepo";

class UserController {
	loginPage(req: Request, res: Response) {
		res.render("login");
	}

	registerPage(req: Request, res: Response) {
		res.render("register");
	}

	async loginSave(req: Request, res: Response, next: NextFunction) {
		const { email, password } = req.body;
		try {
			const user = await new UserRepo().getByEmail(email);

			try {
				if (!user) throw "Senha ou email inválido";

				const comparePasswords = await bcrypt.compare(password, user.password);
				if (!comparePasswords) throw "Senha ou email inválido";
			} catch (err) {
				req.flash("errors", [err]);
				req.session.save(() => res.redirect("back"));
				return;
			}

			req.session.user = {
				id: user._id.toString(),
				name: user.name,
				email: user.email,
				createdAt: user.createdAt,
			};

			req.session.save(() => res.redirect("/"));
		} catch (err) {
			next(err);
		}
	}

	async registerSave(req: Request, res: Response, next: NextFunction) {
		const { name, email, password } = req.body;
		try {
			const userRepo = new UserRepo({ name, email, password });
			await userRepo.create();

			if (userRepo.errors.length > 0) {
				req.flash("errors", userRepo.errors);
				req.session.save(() => res.redirect("back"));
				return;
			}

			req.flash("success", "Usuário criado, agore entre");
			req.session.save();
			return res.redirect("/login");
		} catch (err) {
			next(err);
		}
	}

	async logout(req: Request, res: Response) {
		req.session.destroy(() => res.redirect("back"));
	}
}

export default new UserController();
