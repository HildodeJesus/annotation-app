import "express-async-errors";

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import session from "express-session";
import flash from "connect-flash";
import MongoStore from "connect-mongo";

const app = express();

import routes from "./routes";
import connectDB from "./db/connect";
import notFound from "./middlewares/not-found";
import errorHandle from "./middlewares/error-handle";
import variableGlobal from "./middlewares/global";
import { IUser } from "./models/UserModel";

const sessionConfig = {
	secret: "keyboat cat",
	resave: false,
	saveUninitialized: false,
	store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 3,
		httpOnly: true,
	},
};
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig));
app.use(flash());
app.use(express.static("public"));
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use(variableGlobal);
app.use(routes);
app.use(notFound);
app.use(errorHandle);

declare module "express-session" {
	interface SessionData {
		user: Omit<IUser, "password"> | undefined;
	}
}

(async function () {
	try {
		await connectDB(process.env.MONGO_URI);
		console.log("Initialized Mongo Atlas");
		app.listen(7000, () => console.log("Acessa url http://localhost:7000"));
	} catch (e) {
		console.log(e);
	}
})();
