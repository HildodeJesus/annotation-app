import { Router } from "express";

import auth from "./middlewares/auth";

const routes = Router();

import userController from "./controller/UserController";
import homeController from "./controller/HomeController";
import notesController from "./controller/NotesController";

//Pages
routes.get("/", auth, homeController.index);
routes.get("/login", userController.loginPage);
routes.get("/cadastro", userController.registerPage);
routes.get("/notes/:id", auth, notesController.showNote);

//Treat data
routes.post("/cadastro-save", userController.registerSave);
routes.post("/login-save", userController.loginSave);
routes.get("/logout", userController.logout);

routes.post("/notes", auth, notesController.notesSave);
routes.post("/notes/update/:noteId", auth, notesController.notesSave);
routes.get("/notes/delete/:noteId", auth, notesController.notesDelete);

export default routes;
