import { Request, Response } from "express";

function notFound(req: Request, res: Response) {
	res.render("error", { code: 404, message: "Essa rota não existe!" });
}

export default notFound;
